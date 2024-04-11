const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  
  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Provide email and password', 400));
  }

  try {
    // check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // send token to client if everything is on point
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN 
    });

    res.status(200).json({
      status: 'success',
      token 
    });
  } catch (error) {
    return next(new AppError('Internal server error', 500));
  }
};

