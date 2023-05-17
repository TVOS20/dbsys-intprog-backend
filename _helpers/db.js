const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const config = require("../config/database");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  db.sequelize = sequelize;
  // init models and add them to the exported db object
  db.Employee = require("../employees/employee.model")(sequelize);
  db.Office = require("../offices/office.model")(sequelize);
  db.Product = require("../products/product.model")(sequelize);
  db.ProductLine = require("../productlines/productline.model")(sequelize);
  db.Customer = require("../customers/customer.model")(sequelize);

  db.Employee.belongsTo(db.Office, { foreignKey: "officeCode" });

  // sync all models with database
  await sequelize.sync();
}
