const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String , 
                required: true
            },
            dailyRentalRate: {
                type: Number,
                min:0,
                max: 50,
                required: true
            }
        }),
        required : true
    },
    customer: {
        type: new mongoose.Schema({
            isGold : {
                type: Boolean,
                default: false
            } ,
            name: {
                type: String, 
                required: true
            },
            phone: {
                type: String , 
                min: 8, 
                max : 8
            }
        }),
        required: true
    },
    rentDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    fee: {
        type: Number, 
        min: 0
    }

});

const validateRentalInputs = (rental) => {
    const schema = {
        movieId : Joi.objectId().required(),
        customerId: Joi.objectId().required()
    }

    return Joi.validate(rental , schema)
}

module.exports= {
    validate : validateRentalInputs, 
    Rental : mongoose.model('rentals', rentalSchema)
}