const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const jwt = require("jsonwebtoken");
const config = require("config.json");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const employee = await db.Employee.scope("withHash").findOne({
    where: { email },
  });
  console.log(await bcrypt.compare(password, employee.passwordHash));

  if (!employee || !(await bcrypt.compare(password, employee.passwordHash)))
    throw "email or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: employee.id }, config.secret, {
    expiresIn: "7d",
  });
  return { ...omitHash(employee.get()), token };
}

async function getAll() {
  console.log("execute");
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

  // hash password
  employee.passwordHash = await bcrypt.hash(params.password, 10);

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

  // hash password if it was entered
  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  // copy params to employee and save
  Object.assign(employee, params);
  await employee.save();

  return omitHash(employee.get());
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

function omitHash(employee) {
  const { passwordHash, ...userWithoutHash } = employee;
  return userWithoutHash;
}
