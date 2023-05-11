const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const productService = require("./product.service");
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
  productService
    .getAll()
    .then((products) => res.json(products))
    .catch(next);
}

function getById(req, res, next) {
  productService
    .getById(req.params.id)
    .then((product) => res.json(product))
    .catch(next);
}

function create(req, res, next) {
  productService
    .create(req.body)
    .then(() => res.json({ message: "Product created" }))
    .catch(next);
}

function update(req, res, next) {
  productService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Product updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  productService
    .delete(req.params.id)
    .then(() => res.json({ message: "Product deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    productCode: Joi.string().required(),
    productName: Joi.string().required(),
    productLine: Joi.string().required(),
    productScale: Joi.string().required(),
    productVendor: Joi.string().required(),
    productDescription: Joi.string().required(),
    quantityInStock: Joi.number().required(),
    buyPrice: Joi.number().required(),
    MSRP: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    productCode: Joi.string().empty(""),
    productName: Joi.string().empty(""),
    productLine: Joi.string().empty(""),
    productScale: Joi.string().empty(""),
    productVendor: Joi.string().empty(""),
    productDescription: Joi.string().empty(""),
    quantityInStock: Joi.number().empty(""),
    buyPrice: Joi.number().empty(""),
    MSRP: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}
