const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const Role = require("_helpers/role");
const employeeService = require("./employee.service");
const authorize = require("_middleware/authorize");

// routes

router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", createSchema, create);
router.post("/logout", logout);
router.get("/", authorize, getAll);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

module.exports = router;

// route functions

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  employeeService
    .authenticate(req.body)
    .then((employee) => {
      //send the cookie to the browser
      res.cookie("token", employee.token);
      res.json(employee);
    })
    .catch(next);
}

function logout(req, res, next) {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ message: "Logout Success" });
  } catch (e) {
    next();
  }
}

function getAll(req, res, next) {
  console.log('test')
  employeeService
    .getAll()
    .then((employees) => res.json(employees))
    .catch(next);
}

function getById(req, res, next) {
  employeeService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  employeeService
    .create(req.body)
    .then(() => res.json({ message: "Employee created" }))
    .catch(next);
}

function update(req, res, next) {
  employeeService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Employee updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  employeeService
    .delete(req.params.id)
    .then(() => res.json({ message: "Employee deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    employeeNumber: Joi.number().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    extension: Joi.string().required(),
    email: Joi.string().email().required(),
    officeCode: Joi.string().required(),
    reportsTo: Joi.number().allow(null).required(),
    jobTitle: Joi.string().valid(Role.Admin, Role.VPSales, Role.President, Role.SalesManager, Role.VPMarketing).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    employeeNumber: Joi.number().empty(""),
    lastName: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    extension: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    officeCode: Joi.string().empty(""),
    reportsTo: Joi.number().allow(null).empty(""),
    jobTitle: Joi.string().valid(Role.Admin, Role.VPSales, Role.President, Role.SalesManager, Role.VPMarketing).empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  }).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}
