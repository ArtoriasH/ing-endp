const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./connectionDB");

const Inventario = db.define("Inventario", {
  idInventario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pieza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Inventario;
