const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        lowercase: true
    }
})

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required().min(3).max(32),
        lastName: Joi.string().required().min(3).max(32),
        email: Joi.string().required().email(),
        gender: Joi.string().required()
    })

    return schema.validate(user)
}

module.exports.User = User
module.exports.validateUser = validateUser
