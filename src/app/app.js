const express = require('express');
const cors = require("cors")
const clienteRouter = require('../router/clienteRouter');
const proveedorRouter = require('../router/proveedorRouter');
const inventarioRouter = require('../router/inventarioRouter');
const pedidoRouter = require('../router/pedidoRouter');
const gastoExtraRouter = require('../router/gastoExtraRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is express app!');
});

app.use("/api/v1/cliente", clienteRouter);
app.use("/api/v1/proveedor", proveedorRouter);
app.use("/api/v1/inventario", inventarioRouter);
app.use("/api/v1/pedido", pedidoRouter);
app.use("/api/v1/gastoExtra", gastoExtraRouter);

module.exports = app;