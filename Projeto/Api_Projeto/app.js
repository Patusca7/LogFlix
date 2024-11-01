const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

//const productRoutes = require('./api/routes/products');
const movieRoutes = require('./api/routes/moviesSeries');
const userRoutes = require('./api/routes/users');
const commentRoutes = require('./api/routes/comments');
const listRoutes = require('./api/routes/lists');

mongoose.connect(
    'mongodb+srv://Diogo_Patusca:' +
    process.env.MONGO_ATLAS_PW +
    '@node-rest-movies.i2kjp9h.mongodb.net/?retryWrites=true&w=majority&appName=Node-Rest-Movies')

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/posters', express.static('posters'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Origin, x-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/lists', listRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;