const express = require('express');
const filePath =
  '/Users/mac/Desktop/BE/ST-BLOG-API/assets/blog-data/blogs-simple.json';
const authController = require('./../controllers/authController');

const blogController = require('./../controllers/blogController');
const blogRouter = express.Router();

blogRouter.param('id', blogController.checkID);

blogRouter
  .route('/')
  .get(authController.protect, blogController.getAllBlogs)
  .post(//blogController.checkBody, 
  blogController.createBlogs);

blogRouter
  .route('/:id')
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = blogRouter;
