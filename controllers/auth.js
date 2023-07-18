const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  // check existence
  const q = "SELECT * FROM users WHERE email=? OR username=?";

  db.query(q, [email, userName], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.end("user already exits!!");
    // hash password
    bcrypt.hash(password, 9, (err, hash) => {
      if (err) return res.json(err);
      const q = "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";
      const data = [userName, email, hash];
      db.query(q, [data], (err, data) => {
        if (err) return res.json(err);
        return res.end("user created successfully");
      });
    });
  });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    if (!data.length) return res.status(404).json("User not found!");
    bcrypt.compare(password, data[0].password, function (err, result) {
      if (err) return res.json(err);
      if (!result) return res.status(400).json("Wrong Password!");
      console.log(process.env.JWT_PRIVATE_KEY);
      const token = jwt.sign({ id: data[0].id }, process.env.JWT_PRIVATE_KEY);
      const { password, ...rest } = data[0];
      res
        .cookie("user_info", token, {
          httpOnly: true, // cookie only accessable  when doing api req
        })
        .status(200)
        .json(rest);
    });
  });
};
const logout = (req, res, next) => {};
module.exports = {
  register,
  logout,
  login,
};
