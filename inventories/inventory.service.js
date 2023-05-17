const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Inventory.findAll({
    include: [
      {
        model: db.Product,
        attributes: ["productCode", "productName", "buyPrice"],
      },
      {
        model: db.Office,
        attributes: ["officeCode", "city", "country"],
      },
    ],
  });
}

async function getById(id) {
  return await getInventory(id);
}

async function create(params) {
  const inventory = new db.Inventory(params);

  // save inventory
  await inventory.save();
}

async function update(id, params) {
  const inventory = await getInventory(id);

  // copy params to inventory and save
  Object.assign(inventory, params);
  await inventory.save();

  return inventory.get();
}

async function _delete(id) {
  const inventory = await getInventory(id);
  await inventory.destroy();
}

// helper functions

async function getInventory(id) {
  const inventory = await db.Inventory.findByPk(id);
  if (!inventory) throw "Office not found";
  return inventory;
}
