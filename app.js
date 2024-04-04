const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./routes/blogRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
