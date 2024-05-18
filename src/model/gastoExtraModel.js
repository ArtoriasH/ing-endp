const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./connectionDB");

const GastoExtra = db.define("GastoExtra", {
  idGastoExtra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  concepto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gasto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = GastoExtra;
