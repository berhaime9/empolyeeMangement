//custom imports
const controllers = require("../controllers/emp.controllers");
const empModel = require("../models/emp.model");
const validate = require("../middlewares/validate");

//routers api
// "http://localhost:4001/api/emp/"---> method get ---> for getting data
// "http://localhost:4001/api/emp/"----> method post ----> for adding data
//"http://localhost:4001/api/emp/delete" ----> method post ---> for delete
// http://localhost:4001/api/emp/:id -----> method put ---> for update

//routers gateway
const init = (router) => {
  router
    .route("/emp")
    .get(controllers.getAllEmployee)
    .post(validate(empModel.employeeValidator), controllers.addEmployee);

  router
    .route("/emp/:id")
    .put(validate(empModel.employeeValidator), controllers.updateEmployee);
  router.route("/emp/delete").post(controllers.deleteEmpolyee);
};

//fetching all empolyees from database
// const getAllEmp = async (req, res) => {
//   try {
//     await empModel.getAllEmp(res);
//   } catch (err) {
//     res.status(400).send(message(err));
//   }
// };

//create new empolyee record
// const addEmp = async (req, res) => {

// };

//update existing empolyee record
// const updateEmp = async (req, res) => {
//   const empData = req.body;
//   const id = req.params.id;
//   try {
//     await empModel.updateEmp(id, empData, res);
//   } catch (err) {
//     res.status(400).send(message(err.message));
//   }
// };

//deleting employee record
// const deleteEmp = async (req, res) => {
//   const emp = req.body.emp;
//   try {
//     await empModel.deleteEmp(emp, res);
//   } catch (err) {
//     res.status(400).send(message(err.message));
//   }
// };

module.exports.init = init;
