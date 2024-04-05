const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  id: {
    type: Number,
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
    validate: [validator.isDifficulty, 'Provide blog difficulty level'],
  },
  description: {
    type: String,
    required: [true, 'A blog must have a description'],
    trim: true,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
