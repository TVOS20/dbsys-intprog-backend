const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    productLine: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    textDescription: { type: DataTypes.STRING, allowNull: true },
    htmlDescription: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("ProductLine", attributes, options);
}
