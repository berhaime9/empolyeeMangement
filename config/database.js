//npm packages
const mysql = require("mysql");

//gateway information of mysql
module.exports = mysql.createPool({
  host: process.env.LOCALHOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
