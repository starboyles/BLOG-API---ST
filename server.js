const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace(
  '<PASSWORD>', 
  process.env.DATABASE_PASSWORD
  );

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() =>
    console.log('DB Connection Successful'));
    
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


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("ST-BLOG-API running on port ${port}.... ");
});