const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,  {
    expiresIn: process.env.JWT_EXPIRES_IN 
  });

  res.status(201).json({
    status: 'success',
    data: {
      token,
        user: newUser
    }, 
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  
  //check if email and password do exist
  if(!email || !password) {
    next(new AppError('Provide email and password', 400));

  //check if user exits & password are correct

  //send tooke to client if everything is on point

}};
