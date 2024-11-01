const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imdbID: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: {type: Date, default: Date.now},
    comment: {type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);
