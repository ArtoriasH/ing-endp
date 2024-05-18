const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./connectionDB");

const Pedido = db.define("Pedido", {
  idPedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
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
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  compra: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  proveedor: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  activo: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Pedido;
