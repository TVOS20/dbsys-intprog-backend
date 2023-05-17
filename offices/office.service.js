const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Office.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.Office.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const office = new db.Office(params);

  // hash password
  office.passwordHash = await bcrypt.hash(params.password, 10);

  // save office
  await office.save();
}

async function update(id, params) {
  const office = await getUser(id);

  // copy params to office and save
  Object.assign(office, params);
  await office.save();

  return office.get();
}

async function _delete(id) {
  const office = await getUser(id);
  await office.destroy();
}

// helper functions

async function getUser(id) {
  const office = await db.Office.findByPk(id);
  if (!office) throw "Office not found";
  return office;
}
