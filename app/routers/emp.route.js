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

module.exports.init = init;
