const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/assets/blog-data/blogs-simple.json`)
);

app.get("/api/v1/blogs", (req, res) => {
  res.status(200).json({
    status: "Success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

app.post("/api/v1/blogs", (req, res) => {
  const newId = blogs[blogs.length - 1].id + 1;
  const newBlog = Object.assign({ id: newId }, req.body);

  blogs.push(newBlog);
  fs.writeFile(
    `${__dirname}/assets/data/blogs-simple.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          blog: newBlog,
        },
      });
    }
  );
});

app.patch("/api/v1/blogs", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      blog: "Updated Blog>",
    },
  });
});

app.delete("/api/v1/blogs", (req, res) => {
    res.status(200).json({
        status: "success",
        data: null
    })
});

const port = 8000;
app.listen(port, () => {
  console.log("ST-BLOG-API is running on port 8000...");
});
