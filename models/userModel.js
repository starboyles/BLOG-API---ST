const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//userSchema
//id, name, email, password, passwordConfirm

const userSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, 'Provide a valid or unique email'],
  },
  password: {
    type: String,
    required: [true, 'Provide your password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      //Only works on CREATE and SAVE
      validator: function(el) {
      return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  passwordChangedAt: Date
}); 

userSchema.pre('save', async function(next) {
  //run this if  password was modified
  if (!this.isModified('password')) return next();

  // hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
 if(this.passwordChangedAt) {
  console(this.passwordChangedAt, JWTTimestamp);
 }
 return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
