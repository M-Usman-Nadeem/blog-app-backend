const mysql = require("mysql");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql786imm!!?",
    database: "blog",
    authPlugin: "",
  });