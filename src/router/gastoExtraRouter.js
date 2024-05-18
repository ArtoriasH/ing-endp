const GastoExtra = require("../model/gastoExtraModel");

const gastoExtraRouter = require("express").Router();

gastoExtraRouter.get("/", async (req, res) => {
  await GastoExtra.sync();
  //Buscamos en la base de datos
  const gastoExtraList = await GastoExtra.findAll({
    order: [["createdAt", "ASC"]],
  });

  if (gastoExtraList) {
    return res.status(200).json({
      ok: true,
      status: 200,
      gastoExtraList: gastoExtraList,
    });
  } else {
    return res.status(204).json({
      ok: false,
      status: 204,
    });
  }
});

gastoExtraRouter.post("/", async (req, res) => {
  await GastoExtra.sync();

  //Recibimos la informacion del cliente
  var { pedido, concepto, gasto } = req.body;

  if (!pedido || !concepto || !gasto) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Uno o mas campos vacios",
    });
  }

  //comprobamos que no se repita el correo y creamos el cliente
  const [createGasto, created] = await GastoExtra.findOrCreate({
    where: { pedido: pedido, concepto: concepto, gasto: gasto },
    defaults: {
      pedido: pedido,
      concepto: concepto,
      gasto: gasto,
    },
  });

  if (created) {
    console.log("Gasto creado correctamente");
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Gasto creado correctamente",
    });
  } else {
    console.log("Gasto no creado");
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al registrar el gasto",
    });
  }
});

gastoExtraRouter.put("/:idGastoExtra", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idGastoExtra;
  //Recibimos la informacion del cliente
  var { concepto, gasto } = req.body;

  const updateGastoExtra = await GastoExtra.update(
    { concepto: concepto, gasto: gasto },
    {
      where: { idGastoExtra: id },
    }
  );

  if (updateGastoExtra[0] > 0) {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Gasto actualizado correctamente",
    });
  } else {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al actualizar",
    });
  }
});

gastoExtraRouter.delete("/:idGastoExtra", async (req, res) => {
  //obtenemos el id del cliente desde la url
  var id = req.params.idGastoExtra;
  const deleteGasto = await GastoExtra.destroy({
    where: { idGastoExtra: id },
  });

  if (deleteGasto === 0) {
    res.status(401).json({
      ok: false,
      status: 401,
      message: "Error al eliminar",
    });
  } else {
    res.status(201).json({
      ok: true,
      status: 201,
      message: "Gasto eliminado correctamente",
    });
  }
});

module.exports = gastoExtraRouter;
