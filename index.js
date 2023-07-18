const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const db =require('./config/db')
const postRoutes=require('./routes/posts')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/users')
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api/posts',postRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.listen(8000, () => {
  console.log("connected");
});
// app.get("/", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
// app.post("/", (req, res) => {
//   const { title, description, cover } = req.body;
//   const q = "INSERT INTO books (`title`,`description`,`cover`) VALUES (?)";
//   const data = [title, description, cover];
//   db.query(q, [data], (err, data) => {
//     if (err) return res.json(err);
//     return res.end("data has been added");
//   });
// });

