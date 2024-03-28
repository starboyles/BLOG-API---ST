const fs = require('fs');
const express  = require('express');

const app = express();

app.use(express.json());

const blogs = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/blog-data/blogs-simple.json`)
  );

app.get("/api/v1/blogs", (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: blogs.length,
        data: {
            blogs,
        }
    })
});

app.post("/api/v1/blogs", (req, res) => {
    res.status(200).json({


    })
;
});