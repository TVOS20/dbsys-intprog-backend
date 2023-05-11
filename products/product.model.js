const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    productCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    productName: { type: DataTypes.STRING, allowNull: false },
    productLine: { type: DataTypes.STRING, allowNull: false },
    productScale: { type: DataTypes.STRING, allowNull: false },
    productVendor: { type: DataTypes.STRING, allowNull: false },
    productDescription: { type: DataTypes.TEXT, allowNull: false },
    quantityInStock: { type: DataTypes.SMALLINT, allowNull: false },
    buyPrice: { type: DataTypes.DECIMAL, allowNull: false },
    MSRP: { type: DataTypes.DECIMAL, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Product", attributes, options);
}
