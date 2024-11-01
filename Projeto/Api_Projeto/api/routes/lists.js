const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

const checkAuth = require("../middleware/check-auth");
const List = require("../models/list");


router.get("/userLists", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData;
  const userId = decoded.userId;

  List.find({ userId: userId })
    .select("-__v")
    .exec()
    .then((doc) => {
      res.status(200).json({
        Total: doc.length,
        Lists: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.get("/user/:listId", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData
  const userId = decoded.userId;
  const listId = req.params.listId;

  const conditions = [];

  conditions.push({ _id: listId });
  conditions.push({ userId: userId });

  List.findOne({ $and: conditions })
    .select("-__v")
    .exec()
    .then((doc) => {
      res.status(200).json({
        Name: doc.ListName,
        Total: doc.imdbIDs.length,
        Movies: doc.imdbIDs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.post("/", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData
  const userId = decoded.userId;
  const ListName = req.body.ListName;
  const conditions = [];

  conditions.push({ ListName: ListName });
  conditions.push({ userId: userId });


  List.findOne({ ListName: ListName, userId: userId })
    .exec()
    .then((existingList) => {
      if (existingList) {
        return res.status(409).json({
          message: "Choose another name",
        });
      }

      const list = new List({
        _id: new mongoose.Types.ObjectId(),
        ListName: ListName,
        userId: userId
      });

      list
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "Created successfully",
            createdList: {
              User: result.userID,
              ListName: result.ListName,
              _id: result._id,
              movies: result.imdbIDs,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


router.post("/:listId", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData
  const userId = decoded.userId;

  const listId = req.params.listId;
  const movieId = req.body.movieId;

  const conditions = [];

  conditions.push({ _id: listId });
  conditions.push({ userId: userId });



  List.updateOne({ $and: conditions },  { $addToSet: { imdbIDs: movieId }})
    .exec()
    .then((result) => {
      if (result.modifiedCount != 0) {
        res.status(200).json({
          message: "Movie added to the list",
        });
      } else {
        res.status(409).json({
          message: "Not possible to add Movie to list",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


router.delete("/:listId", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData;
  const userId = decoded.userId;
  const listId = req.params.listId;
  const conditions = [];

  conditions.push({ _id: listId });
  conditions.push({ userId: userId });

  List.deleteOne({ $and: conditions })
    .exec()
    .then((result) => {
      if (result.deletedCount != 0) {
        res.status(200).json({
          message: "List deleted",
        });
      }else{
        res.status(404).json({
            message: "List not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/movie/:listId", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData;
  const userId = decoded.userId;

  const listId = req.params.listId;
  const movieId = req.body.movieId;

  const conditions = [];

  conditions.push({ _id: listId });
  conditions.push({ userId: userId });

  List.updateOne({ $and: conditions }, { $pull: { imdbIDs: movieId } })
    .exec()
    .then((result) => {
      if (result.modifiedCount != 0) {
        res.status(200).json({
          message: "Movie removed from the list",
        });
      } else {
        res.status(409).json({
          message: "Not possible to remove Movie from list",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});




module.exports = router;