const { Sequelize } = require("sequelize");

//Aqui se tendra que cambiar a la BD del HOST
const db = new Sequelize("GOSADB", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  // port: "3306",
});


module.exports = db;

