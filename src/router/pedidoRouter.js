const Pedido = require("../model/pedidoModel");

const pedidoRouter = require("express").Router();

pedidoRouter.get("/", async (req, res) => {
  await Pedido.sync();
  //Buscamos en la base de datos
  const pedidoList = await Pedido.findAll({
    order: [["createdAt", "ASC"]],
  });

  if (pedidoList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      pedidoList: pedidoList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

pedidoRouter.get("/dashboard", async (req, res) => {
  await Pedido.sync();
  //Buscamos en la base de datos
  const pedidoList = await Pedido.findAll({
    where:{ Activo: 1},
    order: [["createdAt", "ASC"]],
  });

  if (pedidoList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      pedidoList: pedidoList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

pedidoRouter.post("/", async (req, res) => {
  await Pedido.sync();

  //Recibimos la informacion del cliente
  var { marca, cliente, modelo, anio, pieza, precio } = req.body;

  if (!marca || !modelo || !cliente || !anio || !pieza || !precio) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Uno o mas campos vacios",
    });
  }

  //comprobamos que no se repita el correo y creamos el cliente
  const [createPedido, created] = await Pedido.findOrCreate({
    where: { marca: marca, modelo: modelo, anio: anio, pieza: pieza, precio: precio, cliente:cliente },
    defaults: {
      marca: marca, 
      modelo: modelo, 
      anio: anio, 
      pieza: pieza,
      precio: precio,
      cliente:cliente,
    },
  });

  if (created) {
    console.log("Pedido creado correctamente");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pedido creado correctamente",
    });
  } else {
    console.log("Pedido no creado");
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al crear pedido",
    });
  }
});

pedidoRouter.put("/:idPedido", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idPedido;
  //Recibimos la informacion del cliente
  var { cliente ,marca, modelo, anio, pieza, precio, compra, proveedor } = req.body;


  const updatePedido = await Pedido.update(
    { cliente:cliente ,marca: marca, modelo: modelo, anio: anio, pieza: pieza, precio: precio, compra:compra, proveedor:proveedor },
    {
      where: { idPedido: id },
    }
  );

  if (updatePedido[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pedido actualizado correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al actualizar",
    });
  }

});

pedidoRouter.delete("/:idPedido", async (req, res) => {
   //obtenemos el id del cliente desde la url
   var id = req.params.idPedido;
 
   const deletePedido = await Pedido.update(
    { activo: 0 },
    {
      where: { idPedido: id },
    }
  );

  if (deletePedido[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Pedido cancelado correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al cancelar",
    });
  }
});

module.exports = pedidoRouter;
