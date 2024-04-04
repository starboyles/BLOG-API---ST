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
    },
    duration: {
        type: integer,
        required: [true, 'A blog must have a duration'],
    },
    difficulty: {
    type: integer,
    required: [true, 'A blog must have a difficulty'],
    },

    description:{

    }
  });

  const Blog = mongoose.model('Blog', blogSchema);