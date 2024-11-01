const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')


exports.getUsers = async (req, res, next) => {
    const queryParam = req.query;
    const searchTerm = queryParam["s"];
    const role = queryParam["r"];
    try {
        const conditions = [];

        if (searchTerm) {
            conditions.push({ email: { $regex: new RegExp(searchTerm, "i") } });
        }

        if (role) {
            conditions.push({ role: role });
        }

        const users = await User.find(conditions.length != 0 ? { $and: conditions } : {}).exec();

        const results = users.map((user) => {
            const result = user.toObject();
            return {
                _id: result._id,
                email: result.email,
                role: result.role,
            };
        });

        res.status(200).json({
            totalResults: results.length,
            Search: results,
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    mensage: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            role: req.body.role || 'user'
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });

            }
        });

}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: user[0].role
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        userId: user[0]._id,
                        role: user[0].role
                        
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.user_delete = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}