const mongoose = require('mongoose');
const validator = require('validator');

//userSchema
//name, email, password, passwordConfirm

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Make your name  known'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Provide your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Provide your password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm your password'],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;