const mongoose = require('mongoose');
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
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
});

const validateCustomerInputs = value => {
    const schema = {
      name: Joi.string()
        .min(3)
        .required(),
      phone: Joi.string()
        .min(8)
        .max(8),
        isGold : Joi.boolean()
    };
  
    return Joi.validate(value, schema);
  };
  

module.exports = {
    Customer : mongoose.model('customers' , customerSchema),
    validate : validateCustomerInputs,
    customerSchema
};