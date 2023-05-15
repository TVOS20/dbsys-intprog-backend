const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.ProductLine.findAll();
}

async function getById(id) {
  return await getProductLine(id);
}

async function create(params) {
  // validate
  if (
    await db.ProductLine.findOne({ where: { productLine: params.productLine } })
  ) {
    throw 'ProductLine "' + params.productLine + '" is already created';
  }

  const productLine = new db.ProductLine(params);

  // save Product
  await productLine.save();
}

async function update(id, params) {
  const productLine = await getProductLine(id);

  // copy params to Product and save
  Object.assign(productLine, params);
  await productLine.save();

  return productLine.get();
}

async function _delete(id) {
  const productLine = await getProductLine(id);
  await productLine.destroy();
}

// helper functions

async function getProductLine(id) {
  const productLine = await db.ProductLine.findByPk(id);
  if (!productLine) throw "ProductLine not found";
  return productLine;
}
