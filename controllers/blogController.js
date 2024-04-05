const fs = require('fs');
const blogRouter = require('../routes/blogRoutes');
const Blog = require('../models/blogModel');
const filePath =
  '/Users/mac/Desktop/BE/ST-BLOG-API/assets/blog-data/blogs-simple.json';
const blogs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

exports.checkID = (req, res, next, val) => {
  console.log('Blog id is ${val}');
  if (req.params.id * 1 > blogs.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.id)
    return res.status(400).json({
      status: 'fail',
      message: 'Missing id or title',
    });
  next();
};

exports.getAllBlogs = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    data: {
      results: blogs.length,
      blogs,
    },
    catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  });
};

exports.getBlog = async (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const blog = blogs.find((el) => el.id === id);
  res.status(200).json({
    status: 'Success',
    data: { blog },
  });
};

exports.createBlogs = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateBlog = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      blog: '<Updated Blog>',
    },
  });
};

exports.deleteBlog = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
