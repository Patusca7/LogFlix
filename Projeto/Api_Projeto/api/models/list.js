const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ListName: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imdbIDs: [{type: String}]
});

module.exports = mongoose.model('List', listSchema);