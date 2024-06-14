const fs = require('fs');
const mongoose = require('mongoose');
const blogRouter = require('../routes/blogRoutes');
const Blog = require('../models/blogModel');
const { Types } = require('mongoose');
const filePath =
  './assets/blog-data/blogs-simple.json';
const blogs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const catchAsync = require('./../utils/catchAsync');

exports.checkID = (req, res, next) => {
  if (req.params.id * 1 > blogs.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// exports.checkBody = (req, res, next) => {
//   if (!req.body.title || !req.body.id)
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing id or title',
//     });
//   next();
// };

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'Success',
      data: {
        results: blogs.length,
        blogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
});

exports.getBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

exports.createBlogs = catchAsync(async (req, res, next) => {
  try {
    const newBlog = await Blog.create({
      // id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      duration: req.body.duration,
      difficulty: req.body.difficulty,
      description: req.body.description,
    });
    newBlog
    .save()
    .then(result => {
      res.status(201).json({
        status: 'Success',
        data: {
          blog: result,
        }
      })
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});
