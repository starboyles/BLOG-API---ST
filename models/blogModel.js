const mongoose = require('mongoose');
const validator = require('validator');

const blogSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: [true, 'A blog must have an id'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'A blog must have a title'],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A blog must have a duration'],
  },
  difficulty: {
    type: Number,
    required: [true, 'A blog must have a difficulty'],
    validate: {
        validator: function(value) {
        return value >= 1 && value <= 5;
    },
    message: 'Provide a blog difficulty level (1-5)'
  }},

  description: {
    type: String,
    required: [true, 'A blog must have a description'],
    trim: true,
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
