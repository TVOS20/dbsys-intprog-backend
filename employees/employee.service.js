const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Employee.findAll();
}

async function getById(id) {
  return await getEmployee(id);
}

async function create(params) {
  // validate
  if (await db.Employee.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const employee = new db.Employee(params);

  // save employee
  await employee.save();
}

async function update(id, params) {
  const employee = await getEmployee(id);

  // validate
  const emailChanged = params.email && employee.email !== params.email;
  if (
    emailChanged &&
    (await db.Employee.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already registered';
  }

  // copy params to employee and save
  Object.assign(employee, params);
  await employee.save();

  return employee.get();
}

async function _delete(id) {
  const employee = await getEmployee(id);
  await employee.destroy();
}

// helper functions

async function getEmployee(id) {
  const employee = await db.Employee.findByPk(id);
  if (!employee) throw "Employee not found";
  return employee;
}
