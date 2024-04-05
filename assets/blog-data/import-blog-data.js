const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../../models/blogModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful'));

//READING JSON FILE
const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/blogs-simple.json`, 'utf-8'),
);

//IMPORTING DATA INTO DATABASE
const importData = async () => {
  try {
    await Blog.create(blogs);
    console.log('Data Successfully Loaded');
  } catch (err) {
    console.log(err);
  }
};

// DELETING DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Blog.deleteMany(blogs);
    console.log('Data Successfully Deleted');
  } catch (err) {
    console.log(err);
  }
};
