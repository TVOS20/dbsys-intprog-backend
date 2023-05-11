const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Product.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.Product.findOne({ where: { productCode: params.productCode } })
  ) {
    throw 'Product "' + params.productCode + '" is already created';
  }

  const product = new db.Product(params);

  // save Product
  await product.save();
}

async function update(id, params) {
  const product = await getUser(id);

  // copy params to Product and save
  Object.assign(product, params);
  await product.save();

  return product.get();
}

async function _delete(id) {
  const product = await getUser(id);
  await product.destroy();
}

// helper functions

async function getUser(id) {
  const product = await db.Product.findByPk(id);
  if (!product) throw "Product not found";
  return product;
}
