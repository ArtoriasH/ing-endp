require('dotenv').config();


const { Sequelize } = require("sequelize");

//Aqui se tendra que cambiar a la BD del HOST
const db = new Sequelize(process.env.DBNAME, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "mysql",
  port: "25060",
});


module.exports = db;

