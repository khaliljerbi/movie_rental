const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
//confing imports
const keys = require('./config/keys');

//routes import
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const register = require('./routes/register');
const login = require('./routes/login');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(!config.get('jwtkey')) {
    console.error('FATAL ERROR : jwt variable must be set.');
    process.exit(1);
}

if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'));
    debug('App started...');

}

//database setup

mongoose.connect(keys.url , {useNewUrlParser: true , useCreateIndex : true , useFindAndModify:false })
    .then(() => console.log('Connected to MongoDB ! '))
    .catch(err => console.log(err.message));



//routes middleware

app.use('/api/genres' , genres);
app.use('/api/customers' , customers);
app.use('/api/movies' , movies);
app.use('/api/rentals' , rentals);
app.use('/api/users' , register);
app.use('/api/users' , login);

app.listen(port , () => console.log(`app listening to port : ${port}...`));
