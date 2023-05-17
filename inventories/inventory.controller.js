const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const inventoryService = require("./inventory.service");

// routes

router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  inventoryService
    .getAll()
    .then((inventories) => res.json(inventories))
    .catch(next);
}

function getById(req, res, next) {
  inventoryService
    .getById(req.params.id)
    .then((inventory) => res.json(inventory))
    .catch(next);
}

function create(req, res, next) {
  inventoryService
    .create(req.body)
    .then(() => res.json({ message: "Inventory created" }))
    .catch(next);
}

function update(req, res, next) {
  inventoryService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Inventory updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  inventoryService
    .delete(req.params.id)
    .then(() => res.json({ message: "Inventory deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    productCode: Joi.string().required(),
    officeCode: Joi.string().required(),
    quantityInStock: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    productCode: Joi.string().empty(""),
    officeCode: Joi.string().empty(""),
    quantityInStock: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}
