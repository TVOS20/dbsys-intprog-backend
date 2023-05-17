const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    productCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    quantityInStock: { type: DataTypes.INTEGER, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Inventory", attributes, options);
}
