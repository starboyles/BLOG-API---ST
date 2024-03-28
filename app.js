const fs = require('fs');
const express  = require('express');
const app = express();

const blogs = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/blog-data/blogs-simple.json`)
  );



app.get("/api/v1/blogs", (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: blogs.length,
        data: Blogs
    })
});

app.post("/api/v1/blogs", (req, res) => {
    res.status(200).json({

        
    })
;
});