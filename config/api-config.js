//npm packages
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
//custom imports
const dbfunc = require("./db-function");
const empRouter = require("../app/routers/emp.route");

//middlewares
app.use(cors());
app.use(express.json());

//checking connection form database
dbfunc.connectionCheck
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//routers config
app.use("/api", router);
const ApiConfig = {
  app: app,
};

//exporting routers
empRouter.init(router);

module.exports = ApiConfig;
