const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String , 
        required: true
    },
    numberInStock: {
        type: Number,
        min:0,
        max: 50,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min:0,
        max: 50,
        required: true
    },
    genre : {
        type: genreSchema,
        required: true
    }

});

const validateMovieInput = (value) => {
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(50).required(),
        dailyRentalRate: Joi.number().min(0).max(50).required(),
        genreId: Joi.objectId().required()
    }
    return Joi.validate(value , schema);
}

module.exports= {
    validate : validateMovieInput,
    Movie : mongoose.model('movies' , movieSchema),
    movieSchema

}


