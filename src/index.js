require('dotenv').config()
const app = require("./app/app");
const db = require("./model/connectionDB");

const port = process.env.PORT || 3000;

(async () => {
  try {
    await db.authenticate();
    console.log("Conectados a la base de datos");
  } catch (err) {
    throw new Error(err);
  }
})();

app.listen(port, () => {
  console.log("Backend funcionando");
});
