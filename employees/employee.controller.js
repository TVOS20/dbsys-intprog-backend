const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const employeeService = require("./employee.service");
const authorize = require("_middleware/authorize");

// routes

router.post("/create", authorize, createSchema, create);
router.get("/", authorize, getAll);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  console.log("test");
  employeeService
    .getAll()
    .then((employees) => res.json(employees))
    .catch(next);
}

function getById(req, res, next) {
  employeeService
    .getById(req.params.id)
    .then((employee) => res.json(employee))
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
    customerNumber: Joi.string(),
    customerName: Joi.string().required(),
    contactLastName: Joi.string().required(),
    contactFirstName: Joi.string().required(),
    phone: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().allow(null).required(),
    city: Joi.string().required(),
    state: Joi.string().allow(null).required(),
    postalCode: Joi.string().allow(null).required(),
    country: Joi.string().required(),
    salesRepEmployeeNumber: Joi.string().allow(null).required(),
    creditLimit: Joi.string().allow(null).required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    customerNumber: Joi.string().empty(""),
    customerName: Joi.string().empty(""),
    contactLastName: Joi.string().empty(""),
    contactFirstName: Joi.string().empty(""),
    phone: Joi.string().empty(""),
    addressLine1: Joi.string().empty(""),
    addressLine2: Joi.string().allow(null).empty(""),
    city: Joi.string().empty(""),
    state: Joi.string().allow(null).empty(""),
    postalCode: Joi.string().allow(null).empty(""),
    country: Joi.string().empty(""),
    salesRepEmployeeNumber: Joi.string().allow(null).empty(""),
    creditLimit: Joi.string().allow(null).empty(""),
  });
  validateRequest(req, next, schema);
}
