const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const axios = require('axios');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./posters/");
    },
    filename: function (req, file, cb) {
        const now = new Date();
        const formattedDate = now.toISOString().replace(/:/g, '-');
        cb(null, formattedDate + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const MovieSerie = require("../models/movieSerie");

const omdbAPI = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_API_KEY;

router.get('/', async (req, res, next) => {
    const queryParam = req.query;
    if (queryParam['i']) {
        const plot = queryParam['plot']
        let filterPlot;
        if (plot == "full") {
            filterPlot = "-__v -ShortPlot";
        } else {
            filterPlot = "-__v -FullPlot";
        }
        if (mongoose.Types.ObjectId.isValid(queryParam['i'])) {
            MovieSerie.findById(queryParam['i'])
                .select(filterPlot)
                .exec()
                .then(doc => {
                    if (doc) {
                        const result = doc.toObject();
                        if (plot === "full") {
                            result.Plot = result.FullPlot;
                            delete result.FullPlot;
                        } else {
                            result.Plot = result.ShortPlot;
                            delete result.ShortPlot;
                        }
                        res.status(200).json({
                            movie: result
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err });
                });
        } else {
            try {
                const response = await axios.get(omdbAPI + "&i=" + queryParam['i'] + "&plot=" + queryParam['plot']);
                res.status(200).json({
                    movie: response.data // Send response data instead of the whole response object
                });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    } else if (queryParam['t']) {
        const plot = queryParam['plot']
        let filterPlot;
        if (plot == "full") {
            filterPlot = "-__v -ShortPlot";
        } else {
            filterPlot = "-__v -FullPlot";
        }
        const movie_series = await MovieSerie.findOne({ Title: new RegExp(queryParam['t'], 'i') }).select(filterPlot).exec();
        if (movie_series) {
            const result = movie_series.toObject();
            if (plot === "full") {
                result.Plot = result.FullPlot;
                delete result.FullPlot;
            } else {
                result.Plot = result.ShortPlot;
                delete result.ShortPlot;
            }

            res.status(200).json({
                "movie": result,
            });
        }
        else {
            try {
                const response = await axios.get(omdbAPI + "&t=" + queryParam['t'] + "&plot=" + queryParam['plot']);
                res.status(200).json({
                    movie: response.data // Send response data instead of the whole response object
                });
            } catch (err) {
                res.status(500).json({ error: err });
            }
        }
    } else {
        res.status(500).json({ mensagem: "Não tem titulo nem ID" });
    }
});


router.get('/search', async (req, res, next) => {
    const queryParam = req.query;
    const searchTerm = queryParam['s'];
    const year = queryParam['y'];

    try {
        const conditions = [];

        if (searchTerm) {
            conditions.push({ Title: { $regex: new RegExp(searchTerm, 'i') } });
        }

        if (year) {
            conditions.push({ Year: year });
        }

        console.log(conditions)
        // Text search for the closest matches
        const movie_series = await MovieSerie.find({ $and: conditions })
            .sort({ Title: 1 })
            .exec();

        const results = movie_series.map(movie => {
            const result = movie.toObject();
            return {
                Title: result.Title,
                Year: result.Year,
                imdbID: result._id,
                Type: result.type,
                Poster: result.Poster
            };
        });
        let omdbResults = [];
        try {
            const response = await axios.get(omdbAPI + "&s=" + searchTerm + "&y=" + year);
            console.log(response)
            omdbResults = response.data.Search;
        } catch (err) {
            console.error("Error fetching data from OMDB API:", err);
        }


        finalResult = [].concat(omdbResults, results).sort().filter(movie => movie != null)

        res.status(200).json({
            Search: finalResult,
            totalResults: finalResult.length
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


router.post('/', checkAuth.checkAdmin, upload.single('Poster'), (req, res, next) => {
    const posterPath = req.file ? req.file.path : "./posters/EmptyImage.png";

    const movie_series = new MovieSerie({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.Title,
        Year: req.body.Year,
        Rated: req.body.Rated,
        Released: req.body.Released,
        Runtime: req.body.Runtime,
        Genre: req.body.Genre,
        Director: req.body.Director,
        Writer: req.body.Writer,
        Actors: req.body.Actors,
        ShortPlot: req.body.ShortPlot,
        FullPlot: req.body.FullPlot,
        Language: req.body.Language,
        Country: req.body.Country,
        Awards: req.body.Awards,
        Poster: "http:/localhost:3000/" + posterPath,
        Metascore: req.body.Metascore,
        imdbRating: req.body.imdbRating,
        imdbVotes: req.body.imdbVotes,
        Type: req.body.Type,
        DVD: req.body.DVD,
        BoxOffice: req.body.BoxOffice,
        Production: req.body.Production,
        Website: req.body.Website
    });
    movie_series.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created ' + result.Type + ' succesfully',
                createdMovie: {
                    Title: result.Title,
                    Released: result.Released,
                    imdbID: result.imdbID
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


router.delete('/:movieId', checkAuth.checkAdmin, (req, res, next) => {
    const id = req.params.movieId;
    MovieSerie.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount != 0) {
                res.status(200).json({
                    message: "Movie deleted",
                });
            } else {
                res.status(404).json({
                    message: "Movie not found",
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})


router.patch("/:movieId", checkAuth.checkAdmin, (req, res, next) => {
    const id = req.params.movieId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    MovieSerie.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            if (result.matchedCount != 0) {
                if (result.modifiedCount != 0) {
                    res.status(200).json({
                        message: "Movie updated",
                    });
                } else {
                    res.status(200).json({
                        message: "Movie not updated",
                    });
                }
            } else {
                res.status(404).json({
                    message: "Movie not Found",
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
