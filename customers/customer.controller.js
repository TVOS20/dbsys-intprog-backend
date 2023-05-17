const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const customerService = require("./customer.service");

// routes

router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  console.log("test");
  customerService
    .getAll()
    .then((customers) => res.json(customers))
    .catch(next);
}

function getById(req, res, next) {
  customerService
    .getById(req.params.id)
    .then((customer) => res.json(customer))
    .catch(next);
}

function create(req, res, next) {
  customerService
    .create(req.body)
    .then(() => res.json({ message: "Customer created" }))
    .catch(next);
}

function update(req, res, next) {
  customerService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Customer updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  customerService
    .delete(req.params.id)
    .then(() => res.json({ message: "Customer deleted" }))
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
    jobTitle: Joi.string().required(),
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
    jobTitle: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
