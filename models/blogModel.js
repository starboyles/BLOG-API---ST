const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: {
    type: "number",
    required: [true, "A blog must have an id"],
    unique: true,
  },
  title: {
    type: "string",
    required: [true, "A blog must have a title"],
    trim: true
  },
  duration: {
    type: number,
    required: [true, "A blog must have a duration"],
  },
  difficulty: {
    type: number,
    required: [true, "A blog must have a difficulty"],
    validate: [validator.isDifficulty, 'Provide blog difficulty level']
  },
  description: {
    type: string,
    required: [true, "A blog must have a description"],
    trim: true,
  },

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
