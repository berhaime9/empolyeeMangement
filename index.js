//custom imports
const api = require("./config/api-config");

if (
  !process.env.LOCALHOST &&
  !process.env.DB_USER &&
  !process.env.PASSWORD &&
  !process.env.DATABASE
) {
  throw new Error("FATAL ERROR: environment variables  is not defined.");
}

//connecting to port
const port = process.env.PORT;
api.app.listen(port || 4001, () =>
  console.log("sever started on localhost:4001")
);
