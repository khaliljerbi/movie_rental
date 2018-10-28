const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const validateInput = (input) => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    
    return Joi.validate(input , schema) ;
}

module.exports = {
    Genre : mongoose.model('genres' , genreSchema),
    validate : validateInput,
    genreSchema
};