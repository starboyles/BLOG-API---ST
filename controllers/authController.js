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

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  
  //check if email and password do exist
  if(!email || !password) {
    res.status(404).json({
      status: 'fail',
      message: "Provide email and password"
    });
  }else{
    User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length<1){
        return res.status(401).json({
          message: 'User does not exist'
        })
      }
  //send token to client if everything is on point  
      const token = '';
      res.status(201).json({
        status: 'success',
        token 
      });
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({
        status: 'fail',
        message: "An error occured whiles loggin in" 
      });
    })
  }
};
