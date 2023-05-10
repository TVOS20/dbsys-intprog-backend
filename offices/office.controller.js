const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const officeService = require("./office.service");
const authorize = require("_middleware/authorize");

// routes


router.post("/create", createSchema, create);
router.get("/", authorize, getAll);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  console.log('test')
  officeService
    .getAll()
    .then((offices) => res.json(offices))
    .catch(next);
}

function getById(req, res, next) {
  officeService
    .getById(req.params.id)
    .then((office) => res.json(office))
    .catch(next);
}

function create(req, res, next) {
  officeService
    .create(req.body)
    .then(() => res.json({ message: "Employee created" }))
    .catch(next);
}

function update(req, res, next) {
  officeService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Employee updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  officeService
    .delete(req.params.id)
    .then(() => res.json({ message: "Employee deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    officeCode: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().allow(null).required(),
    state: Joi.string().allow(null).required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    territory: Joi.string().required(),

  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    eofficeCode: Joi.string().empty(""),
    city: Joi.string().empty(""),
    phone: Joi.string().empty(""),
    addressLine1: Joi.string().empty(""),
    addressLine2: Joi.string().allow(null).empty(""),
    state: Joi.string().allow(null).empty(""),
    country: Joi.string().empty(""),
    postalCode: Joi.string().empty(""),
    territory: Joi.string().empty(""),

  })
  validateRequest(req, next, schema);
}
