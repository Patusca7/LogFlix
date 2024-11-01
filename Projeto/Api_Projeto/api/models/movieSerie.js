const mongoose = require('mongoose');

const movie_seriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: { type: String, required: true },
    Year: {type: Number, default: new Date().getFullYear()},
    Rated: {type: String, default: "R"},
    Released: {type: Date, default: Date.now},
    Runtime: {type: String, default: "1h 30m"},
    Genre: {type: String, default: "Action"},
    Director: {type: String, default: "Unknown"},
    Writer: {type: String, default: "Unknown"},
    Actors: {type: String, default: "Unknown"},
    ShortPlot: {type: String, default: "Unknown"},
    FullPlot: {type: String, default: "Unknown"},
    Language: {type: String, default: "English"},
    Country: {type: String, default: "USA"},
    Awards: {type: String, default: "Unknown"},
    Poster: {type: String, default: "http:/localhost:3000/poster/EmptyImage.png"},
    Metascore: {type: Number, default: 0},
    imdbRating: {type: Number, default: 0},
    imdbVotes: {type: Number, default: 0},
    imdbID: {type: mongoose.Schema.Types.ObjectId, default: function () {
        return this._id;
      }},
    Type: {type: String, default: "movie"},
    DVD: {type: String, default: null},
    BoxOffice: {type: String, default: "0"},
    Production: {type: String, default: "N/A"},
    Website: {type: String, default: "N/A"}
});

module.exports = mongoose.model('MovieSerie', movie_seriesSchema)

