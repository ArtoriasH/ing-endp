const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("./connectionDB");

const Cliente = db.define("Cliente", {
  idCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Cliente;
