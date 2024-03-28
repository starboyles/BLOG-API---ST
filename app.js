const express  = require('express');
const app = express();

app.get("/api/v1/blogs", (req, res) => {
    res.status.json(200);
})