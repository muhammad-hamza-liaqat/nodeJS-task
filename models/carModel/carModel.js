const mongoose = require('mongoose');
const Joi = require('joi');



const carSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    registrationNo: {
        type: String,
        required: true,
        unique: true,
    },
});


// Joi validation schema
const carValidationSchema = Joi.object({
    color: Joi.string().alphanum().required(),
    model: Joi.string().alphanum(),
    make: Joi.string().alphanum(),
    registrationNo: Joi.string().alphanum().required(),
});

const carModel = mongoose.model('cars', carSchema);

module.exports = {carModel, carValidationSchema};
