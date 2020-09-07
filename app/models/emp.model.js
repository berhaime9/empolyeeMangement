//npm packages
const joi = require("joi");
//custom imports
const db = require("../../config/database");
const dbFunc = require("../../config/db-function");
const message = require("../middlewares/message");

//fetching all empolyees from database
const getAllEmp = async () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM empolyeeDB.empolyee`, (error, rows, fields) => {
      if (error) {
        dbFunc.connectionRelease;
        reject(error.message);
      } else {
        dbFunc.connectionRelease;
        // console.log(rows);
        resolve(rows);
      }
    });
  });
};

//create new empolyee record
const addEmp = (emp) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO empolyee(name,email,mobile,location)VALUES('${emp.emp_name}','${emp.emp_email}' , '${emp.emp_mobile}', '${emp.emp_location}')`,
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(message(error.message));
        } else {
          dbFunc.connectionRelease;
          resolve(message("successfully inserted!!"));
        }
      }
    );
  });
};

//update existing empolyee record
function updateEmp(id, emp) {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE empolyee set name='${emp.emp_name}', email='${emp.emp_email}',mobile='${emp.emp_mobile}',location='${emp.emp_location}' WHERE (id='${id}')`,
      (error, rows, fields) => {
        if (error) {
          dbFunc.connectionRelease;
          reject(message(error.message));
        } else {
          dbFunc.connectionRelease;
          resolve(message("successfully updated!!!"));
        }
      }
    );
  });
}

//deleting employee record
const deleteEmp = (emp, res) => {
  // console.log(emp, "arrived");
  return new Promise((resolve, reject) => {
    emp.map((e, index) => {
      db.query(
        `DELETE FROM empolyee WHERE id='${e.id}'`,
        (error, rows, fields) => {
          if (emp.length - 1 === index) {
            if (error) {
              dbFunc.connectionRelease;
              reject(message(error.message));
            } else {
              dbFunc.connectionRelease;
              resolve(message("successfully Removed!!"));
            }
          }
        }
      );
    });
  });
};

//validators
const employeeValidator = (data) => {
  const schema = joi.object({
    emp_id: joi.number(),
    emp_name: joi.string().min(1).required(),
    emp_email: joi.string().email().min(1).required(),
    emp_mobile: joi.number().min(1).required(),
    emp_location: joi.string().min(1).required(),
  });

  return schema.validate(data);
};

//exporting employee model to router
const empolyeeModel = {
  getAllEmp: getAllEmp,
  addEmp: addEmp,
  updateEmp: updateEmp,
  deleteEmp: deleteEmp,
  employeeValidator: employeeValidator,
};
module.exports = empolyeeModel;
