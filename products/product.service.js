const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.sequelize.query(
    `SELECT p.*, pl.textDescription FROM products p JOIN productlines pl ON p.productLine = pl.productLine`,
    {
      type: QueryTypes.SELECT,
    }
  );
}

async function getById(id) {
  return await getProduct(id);
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
  const product = await getProduct(id);

  // copy params to Product and save
  Object.assign(product, params);
  await product.save();

  return product.get();
}

async function _delete(id) {
  const product = await getProduct(id);
  await product.destroy();
}

// helper functions

async function getProduct(id) {
  const product = await db.Product.findByPk(id);
  if (!product) throw "Product not found";
  return product;
}
