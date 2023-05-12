const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  console.log("execute");
  return await db.Customer.findAll();
}

async function getById(id) {
  return await getCustomer(id);
}

async function create(params) {
  // validate
  // if (await db.Customer.findOne({ where: { email: params.email } })) {
  //   throw 'Email "' + params.email + '" is already registered';
  // }

  const customer = new db.Customer(params);

  // save customer
  await customer.save();
}

async function update(id, params) {
  const customer = await getCustomer(id);

  // validate
  // const emailChanged = params.email && customer.email !== params.email;
  // if (
  //   emailChanged &&
  //   (await db.Customer.findOne({ where: { email: params.email } }))
  // ) {
  //   throw 'Email "' + params.email + '" is already registered';
  // }

  // copy params to customer and save
  Object.assign(customer, params);
  await customer.save();

  return customer.get();
}

async function _delete(id) {
  const customer = await getCustomer(id);
  await customer.destroy();
}

// helper functions

async function getCustomer(id) {
  const customer = await db.Customer.findByPk(id);
  if (!customer) throw "Customer not found";
  return customer;
}
