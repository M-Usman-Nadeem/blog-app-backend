const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const db =require('./config/db')
app.get("/", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/", (req, res) => {
  const { title, description, cover } = req.body;
  const q = "INSERT INTO books (`title`,`description`,`cover`) VALUES (?)";
  const data = [title, description, cover];
  db.query(q, [data], (err, data) => {
    if (err) return res.json(err);
    return res.end("data has been added");
  });
});
app.listen(8000, () => {
  console.log("connected");
});

