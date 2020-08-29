//custom imports
const empModel = require("../models/emp-model");
const validate = require("../middlewares/validate");
const message = require("../middlewares/message");

//routers api
// "http://localhost:4001/api/emp/"---> method get ---> for getting data
// "http://localhost:4001/api/emp/"----> method post ----> for adding data
//"http://localhost:4001/api/emp/delete" ----> method post ---> for delete
// http://localhost:4001/api/emp/:id -----> method put ---> for update

//routers gateway
const init = (router) => {
  router
    .route("/emp")
    .get(getAllEmp)
    .post(validate(empModel.employeeValidator), addEmp);

  router.route("/emp/:id").put(validate(empModel.employeeValidator), updateEmp);
  router.route("/emp/delete").post(deleteEmp);
};

//fetching all empolyees from database
const getAllEmp = async (req, res) => {
  try {
    await empModel.getAllEmp(res);
  } catch (err) {
    res.status(400).send(message(err));
  }
};

//create new empolyee record
const addEmp = async (req, res) => {
  var empData = req.body;
  try {
    await empModel.addEmp(empData, res);
  } catch (err) {
    res.status(400).send(message(err));
  }
};

//update existing empolyee record
const updateEmp = async (req, res) => {
  const empData = req.body;
  const id = req.params.id;
  try {
    await empModel.updateEmp(id, empData, res);
  } catch (err) {
    res.status(400).send(message(err.message));
  }
};

//deleting employee record
const deleteEmp = async (req, res) => {
  const emp = req.body.emp;
  try {
    await empModel.deleteEmp(emp, res);
  } catch (err) {
    res.status(400).send(message("err"));
  }
};

module.exports.init = init;
