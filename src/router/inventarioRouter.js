const Inventario = require("../model/inventarioModel");

const inventarioRouter = require("express").Router();

inventarioRouter.get("/", async (req, res) => {
  await Inventario.sync();
  //Buscamos en la base de datos
  const inventarioList = await Inventario.findAll({
    order: [["createdAt", "ASC"]],
  });

  if (inventarioList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      inventarioList: inventarioList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

inventarioRouter.post("/", async (req, res) => {
  await Inventario.sync();

  //Recibimos la informacion del cliente
  var { marca, modelo, anio, pieza } = req.body;

  if (!marca || !modelo || !anio || !pieza) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Uno o mas campos vacios",
    });
  }

  //comprobamos que no se repita el correo y creamos el cliente
  const [createInventario, created] = await Inventario.findOrCreate({
    where: { marca: marca, modelo: modelo, anio: anio, pieza: pieza },
    defaults: {
      marca: marca, 
      modelo: modelo, 
      anio: anio, 
      pieza: pieza,
    },
  });

  if (created) {
    console.log("Pieza añadida correctamente al inventario");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pieza añadida correctamente al inventario",
    });
  } else {
    console.log("Pieza no añadida al inventario");
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Pieza no añadida al inventario",
    });
  }
});

inventarioRouter.put("/:idInventario", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idInventario;
  //Recibimos la informacion del cliente
  var { marca, modelo, anio, pieza } = req.body;


  const updateInventario = await Inventario.update(
    { marca: marca, modelo: modelo, anio: anio, pieza: pieza },
    {
      where: { idInventario: id },
    }
  );

  if (updateInventario[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pieza actualizada correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al actualizar",
    });
  }

});

inventarioRouter.delete("/:idInventario", async (req, res) => {
   //obtenemos el id del cliente desde la url
   var id = req.params.idInventario;
 
   const deleteInventario = await Inventario.destroy(
     {
       where: { idInventario: id },
     }
   );
 
   if (deleteInventario === 0) {
     res.status(401).json({
       ok: false,
       status: 401,
       message: "Error al eliminar",
     });
   } else {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pieza eliminada correctamente",
    });
    
   }
});

module.exports = inventarioRouter;
