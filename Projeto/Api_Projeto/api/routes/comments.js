const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const checkAuth = require("../middleware/check-auth");


const Comments = require("../models/comment");
const user = require("../models/user");
const omdbAPI = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_API_KEY;

router.get("/:movieID", (req, res, next) => {
  const movieID = req.params.movieID;

  Comments.find({ imdbID: movieID })
    .select("-__v")
    .populate("userId", "-__v -password")
    .exec()
    .then((doc) => {
      res.status(200).json({
        Total: doc.length,
        Comments: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData;
  const userId = decoded.userId;

  const comment = new Comments({
    _id: new mongoose.Types.ObjectId(),
    imdbID: req.body.imdbID,
    userId: userId,
    comment: req.body.comment,
  });

  comment
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created succesfully",
        createdComment: {
          User: result.userID,
          Comment: result.comment,
          imdbID: result.imdbID,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/user/:commentId", checkAuth.checkAuth, (req, res, next) => {
  const decoded = req.userData;
  const userId = decoded.userId;
  const commentId = req.params.commentId;
  const conditions = [];

  conditions.push({ _id: commentId });
  conditions.push({ userId: userId });

  Comments.deleteOne({ $and: conditions })
    .exec()
    .then((result) => {
      if (result.deletedCount != 0) {
        console.log(result);
        res.status(200).json({
          message: "Comment deleted",
        });
      } else {
        res.status(404).json({
          message: "Not able to delete comment",
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

router.delete("/:commentId", checkAuth.checkAdmin, (req, res, next) => {  
  const id = req.params.commentId;
  Comments.deleteOne({ _id: id })
    .exec()
    .then((result) => {
        if (result.deletedCount != 0) {
            console.log(result);
            res.status(200).json({
              message: "Comment deleted",
            });
          } else {
            res.status(404).json({
              message: "Not able to delete comment",
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

module.exports = router;