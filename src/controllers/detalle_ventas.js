const DetalleVenta = require("../models/detalle_ventas");
const Venta = require("../models/ventas");
const Producto = require("../models/productos.js");

const httpDetalle = {
  // Listar detalle de venta por ID de venta
  listarDetalleVentaPorIdVenta: async (req, res) => {
    const { idventa } = req.params;
    try {
      const detallesVenta = await DetalleVenta.find({ idventa });
      res.json(detallesVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Insertar nuevo detalle de venta
  insertarDetalleVenta: async (req, res) => {
    const { idventa, idproductos, cantidad, descuento } = req.body;

    try {
        const producto = await Producto.findById(idproductos);
        if (!producto) {
            return res.status(404).json({ message: 'El producto no existe' });
        }

        const totalSinDescuento = cantidad * producto.precio;
        const totalConDescuento = totalSinDescuento * (1 - (descuento || 0) / 100);

        const detalleVenta = new DetalleVenta({ idventa, idproductos, cantidad, descuento, total: totalConDescuento });
        await detalleVenta.save();

        // Recalcular el valor total de la venta
        const detallesVenta = await DetalleVenta.find({ idventa });
        const valorTotalVentas = detallesVenta.reduce((acumulador, detalle) => acumulador + detalle.total, 0);

        // Encontrar el descuento máximo entre todos los detalles de venta
        const descuentosDetalles = detallesVenta.map(detalle => detalle.descuento);
        const descuentoMaximo = Math.max(...descuentosDetalles);

        // Actualizar la venta con los nuevos valores calculados
        await Venta.findByIdAndUpdate(idventa, { 
            ValorTotalVenta: valorTotalVentas,
            descuento: descuentoMaximo
        });

        res.status(201).json(detalleVenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},

  // Modificar detalle de venta
  modificarDetalleVenta: async (req, res) => {
    const { id } = req.params;
    const { cantidad, descuento } = req.body;

    try {
      const detalleVenta = await DetalleVenta.findById(id);
      if (!detalleVenta) {
        return res
          .status(404)
          .json({ message: "Detalle de venta no encontrado" });
      }

      const producto = await Producto.findById(detalleVenta.idproductos);
      if (!producto) {
        return res.status(404).json({ message: "El producto no existe" });
      }

      // Mantén los valores actuales si no se proporcionan nuevos valores
      const nuevaCantidad =
        cantidad !== undefined ? cantidad : detalleVenta.cantidad;
      const nuevoDescuento =
        descuento !== undefined ? descuento : detalleVenta.descuento;

      // Calcular los nuevos totales
      const totalsin = nuevaCantidad * producto.precio;
      const totalConDescuento = totalsin * (1 - nuevoDescuento / 100);

      // Actualizar el detalle de venta
      detalleVenta.cantidad = nuevaCantidad;
      detalleVenta.descuento = nuevoDescuento;
      detalleVenta.total = totalConDescuento;
      await detalleVenta.save();

      // Recalcular los totales en el modelo Venta
      const detallesVenta = await DetalleVenta.find({
        idventa: detalleVenta.idventa,
      });
      const valorTotalVentas = detallesVenta.reduce(
        (acumulador, detalle) => acumulador + detalle.total,
        0
      );
      const descuentoTotal = detallesVenta.reduce(
        (acumulador, detalle) =>
          acumulador +
          (detalle.descuento / 100) * detalle.cantidad * producto.precio,
        0
      );

      await Venta.findByIdAndUpdate(detalleVenta.idventa, {
        ValorTotalVenta: valorTotalVentas,
        descuentoTotal: descuentoTotal,
      });

      res.json(detalleVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  eliminarDetalleVenta: async (req, res) => {
    const { id } = req.params;

    try {
      // Eliminar el detalle de venta por su ID
      const detalleVenta = await DetalleVenta.findByIdAndDelete(id);
      if (!detalleVenta) {
        return res
          .status(404)
          .json({ message: "Detalle de venta no encontrado" });
      }

      // Recalcular los totales en el modelo Venta
      const detallesVenta = await DetalleVenta.find({
        idventa: detalleVenta.idventa,
      });
      const valorTotalVentas = detallesVenta.reduce(
        (acumulador, detalle) => acumulador + detalle.total,
        0
      );
      const descuentoTotal = detallesVenta.reduce(
        (acumulador, detalle) =>
          acumulador +
          (detalle.descuento / 100) * detalle.cantidad * detalle.precio,
        0
      );

      await Venta.findByIdAndUpdate(detalleVenta.idventa, {
        ValorTotalVenta: valorTotalVentas,
        descuentoTotal: descuentoTotal,
      });

      res.json({ message: "Detalle de venta eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { httpDetalle };
