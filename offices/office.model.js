const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    officeCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    city: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    addressLine1: { type: DataTypes.STRING, allowNull: false },
    addressLine2: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    territory: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Office", attributes, options);
}
