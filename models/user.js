const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        require: true, 
        unique: true
    },
    name: {
        type: String,
        min: 5 , 
        max : 120,
        required: true
    },
    password: {
        type: String,
        min: 6,
        require: true
    },
    isAdmin : Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id : this._id , isAdmin: this.isAdmin } , config.get('jwtkey')  , {expiresIn : "1d" });
    return token ;
}

const validateUserRegisterInput = (input) => {
    const schema = {
        email : Joi.string().email().required(),
        name: Joi.string().min(5).max(120).required(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(input , schema);
}
const validateUserLoginInput = (input) => {
    const schema = {
        email : Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(input , schema);
}

module.exports = {
    validateRegister: validateUserRegisterInput,
    validateLogin : validateUserLoginInput,
    User : mongoose.model('users', userSchema),
    userSchema
}