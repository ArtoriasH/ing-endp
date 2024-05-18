const { Op } = require("sequelize");
const Cliente = require("../model/clientesModel");

const clienteRouter = require("express").Router();

clienteRouter.get("/", async (req, res) => {
  await Cliente.sync();
  //Buscamos en la base de datos
  const clientesList = await Cliente.findAll({
    order: [["createdAt", "ASC"]],
  });

  if (clientesList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      clientesList: clientesList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

clienteRouter.post("/", async (req, res) => {
  await Cliente.sync();

  //Recibimos la informacion del cliente
  var { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Uno o mas campos vacios",
    });
  }

  //comprobamos que no se repita el correo y creamos el cliente
  const [createCliente, created] = await Cliente.findOrCreate({
    where: { email: email },
    defaults: {
      name: name,
      email: email,
      phone: phone,
    },
  });

  if (created) {
    console.log("Cliente creado correctamente");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Cliente creado correctamente",
    });
  } else {
    console.log("Cliente no creado");
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Email existente",
    });
  }
});

clienteRouter.put("/:idCliente", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idCliente;
  //Recibimos la informacion del cliente
  var { name, email, phone } = req.body;

  const updateCliente = await Cliente.update(
    { name: name, email: email, phone: phone },
    {
      where: { idCliente: id },
    }
  );

  if (updateCliente[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Cliente actualizado correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al actualizar",
    });
  }

});

clienteRouter.delete("/:idCliente", async (req, res) => {
   //obtenemos el id del cliente desde la url
   var id = req.params.idCliente;
 
   const deleteCliente = await Cliente.destroy(
     {
       where: { idCliente: id },
     }
   );
 
   if (deleteCliente === 0) {
     res.status(401).json({
       ok: false,
       status: 401,
       message: "Error al eliminar",
     });
   } else {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Cliente eliminado correctamente",
    });
    
   }
});

module.exports = clienteRouter;
