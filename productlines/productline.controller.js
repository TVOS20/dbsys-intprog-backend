const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const productLineService = require("./productline.service");
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
  productLineService
    .getAll()
    .then((productLines) => res.json(productLines))
    .catch(next);
}

function getById(req, res, next) {
  productLineService
    .getById(req.params.id)
    .then((productLine) => res.json(productLine))
    .catch(next);
}

function create(req, res, next) {
  productLineService
    .create(req.body)
    .then(() => res.json({ message: "Productline created" }))
    .catch(next);
}

function update(req, res, next) {
  productLineService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Productline updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  productLineService
    .delete(req.params.id)
    .then(() => res.json({ message: "Productline deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    productLine: Joi.string().required(),
    textDescription: Joi.string().required(),
    htmlDescription: Joi.string().required(),
    image: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    productLine: Joi.string().empty(""),
    textDescription: Joi.string().empty(""),
    htmlDescription: Joi.string().empty(""),
    image: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
