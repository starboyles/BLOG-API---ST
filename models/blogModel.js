const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id: {
      type: 'number',
      required: [true, 'A blog must have an id'],
      unique: true,
    },
    title: { 
      type: 'string',
      required: [true, 'A blog must have a title']
    }
  });
  const Blog = mongoose.model('Blog', blogSchema);