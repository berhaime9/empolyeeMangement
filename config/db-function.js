//custom imports
const db = require("./database");

//connecting to sql databse
function connectionCheck() {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        if (connection) {
          return connection.release();
        }
        reject(err);
      } else {
        resolve("mysql succesfully connected");
      }
    });
  });
}

//disconnecting from connection
function connectionRelease() {
  db.on("release", function (connection) {
    // console.log("Connection %d released", connection.threadId);
  });
}

//exporting functions
module.exports = {
  connectionCheck: connectionCheck(),
  connectionRelease: connectionRelease(),
};
