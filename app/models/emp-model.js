//npm packages
const joi = require("joi");
//custom imports
const db = require("../../config/database");
const dbFunc = require("../../config/db-function");
const message = require("../middlewares/message");

//fetching all empolyees from database
const getAllEmp = (res) => {
  db.query(`SELECT * FROM empolyeeDB.empolyee`, (error, rows, fields) => {
    if (!!error) {
      dbFunc.connectionRelease;
      res.status(400).send(message(error.message));
    } else {
      dbFunc.connectionRelease;
      res.status(200).send(rows);
    }
  });
};

//create new empolyee record
const addEmp = (emp, res) => {
  db.query(
    `INSERT INTO empolyee(name,email,mobile,location)VALUES('${emp.emp_name}','${emp.emp_email}' , '${emp.emp_mobile}', '${emp.emp_location}')`,
    (error, rows, fields) => {
      if (error) {
        dbFunc.connectionRelease;
        res.status(400).send(message(error.message));
      } else {
        dbFunc.connectionRelease;
        res.status(200).send(message("successfully inserted!!"));
      }
    }
  );
};

//update existing empolyee record
function updateEmp(id, emp, res) {
  db.query(
    `UPDATE empolyee set name='${emp.emp_name}', email='${emp.emp_email}',mobile='${emp.emp_mobile}',location='${emp.emp_location}' WHERE (id='${emp.emp_id}')`,
    (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        res.status(400).send(message(error.message));
      } else {
        dbFunc.connectionRelease;
        res.status(200).send(message("successfully updated!!!"));
      }
    }
  );
}

//deleting employee record
const deleteEmp = (emp, res) => {
  // console.log(emp, "arrived");
  emp.map((e, index) => {
    db.query(
      `DELETE FROM empolyee WHERE id='${e.id}'`,
      (error, rows, fields) => {
        if (emp.length - 1 === index) {
          if (error) {
            dbFunc.connectionRelease;
            res.status(400).send(message(error.message));
          } else {
            dbFunc.connectionRelease;
            res.status(200).send(message("successfully Removed!!"));
          }
        }
      }
    );
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
