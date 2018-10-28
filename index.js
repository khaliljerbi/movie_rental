const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');

//confing imports
const keys = require('./config/keys');

//routes import
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.listen(port , () => console.log(`app listening to port : ${port}...`));
