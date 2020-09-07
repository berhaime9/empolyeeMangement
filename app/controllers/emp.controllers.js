const empModel = require("../models/emp.model");
const message = require("../middlewares/message");

//fetching all empolyees from database
exports.getAllEmployee = async (req, res) => {
  await empModel
    .getAllEmp()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(message(err.message)));
};

//create new empolyee record
exports.addEmployee = async (req, res) => {
  const empData = req.body;
  await empModel
    .addEmp(empData)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(message(err.message)));
};

//update existing empolyee record
exports.updateEmployee = async (req, res) => {
  const empData = req.body;
  const id = req.params.id;

  await empModel
    .updateEmp(id, empData)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(message(err.message)));
};

//deleting employee record
exports.deleteEmpolyee = async (req, res) => {
  const emp = req.body.emp;

  await empModel
    .deleteEmp(emp)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(message(err.message)));
};
