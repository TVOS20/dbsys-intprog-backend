const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    customerNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    customerName: { type: DataTypes.STRING, allowNull: false },
    contactLastName: { type: DataTypes.STRING, allowNull: false },
    contactFirstName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    addressLine1: { type: DataTypes.STRING, allowNull: false },
    addressLine2: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: true },
    postalCode: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    salesRepEmployeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creditLimit: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Customer", attributes, options);
}
