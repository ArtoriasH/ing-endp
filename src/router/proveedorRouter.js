const Proveedor = require("../model/proveedorModel");

const proveedorRouter = require("express").Router();

proveedorRouter.get("/", async (req, res) => {
  await Proveedor.sync();
  //Buscamos en la base de datos
  const proveedorList = await Proveedor.findAll({
    order: [["createdAt", "ASC"]],
  });

  if (proveedorList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      proveedorList: proveedorList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

proveedorRouter.post("/", async (req, res) => {
  await Proveedor.sync();

  //Recibimos la informacion del cliente
  var { name, phone, address } = req.body;

  if (!name || !address || !phone) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Uno o mas campos vacios",
    });
  }

  //comprobamos que no se repita el correo y creamos el cliente
  const [createProveedor, created] = await Proveedor.findOrCreate({
    where: { name: name },
    defaults: {
      name: name,
      phone: phone,
      address: address,
    },
  });

  if (created) {
    console.log("Proveedor creado correctamente");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Proveedor creado correctamente",
    });
  } else {
    console.log("Proveedor no creado");
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Proveedor existente",
    });
  }
});

proveedorRouter.put("/:idProveedor", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idProveedor;
  //Recibimos la informacion del cliente
  var { name, phone, address } = req.body;


  const updateProveedor = await Proveedor.update(
    { name: name, phone: phone, address: address },
    {
      where: { idProveedor: id },
    }
  );

  if (updateProveedor[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Proveedor actualizado correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al actualizar",
    });
  }

});

proveedorRouter.delete("/:idProveedor", async (req, res) => {
   //obtenemos el id del cliente desde la url
   var id = req.params.idProveedor;
 
   const deleteProveedor = await Proveedor.destroy(
     {
       where: { idProveedor: id },
     }
   );
 
   if (deleteProveedor === 0) {
     res.status(401).json({
       ok: false,
       status: 401,
       message: "Error al eliminar",
     });
   } else {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Proveedor eliminado correctamente",
    });
    
   }
});

module.exports = proveedorRouter;
