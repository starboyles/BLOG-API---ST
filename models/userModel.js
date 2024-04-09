const mongoose = require('mongoose');
const validator = require('validator');

//userSchema
//id, name, email, password, passwordConfirm

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: [true, 'A user must have an id'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Make your name  known'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Provide your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Provide your password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      
    }
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
