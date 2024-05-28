const Producto = require("../models/productos.js");

const productoHelper = {
  existeProductoID: async (id, req) => {
    const existe = await Producto.findById(id);
    if (!existe) {
      throw new Error(`Registro no existe ${id}`);
    }
    req.req.productobd = existe;
  },

  existeNombreProducto: async (nombre, req) => {
    if (nombre) {
      const existe = await Producto.findOne({ nombre });
      if (existe) {
        if (req.req.method === "PUT") {
          if (existe.nombre !== req.req.productobd.nombre)
            throw new Error(
              `Ya existe ese nombre en la base de datos!!! ${nombre}`
            );
        } else {
          throw new Error(
            `Ya existe ese nombre en la base de datos!!! ${nombre}`
          );
        }
      }
    } 
  },
  verificarNombre: async (nombre, req) => {
    const existe = await Producto.findOne({ nombre });
    if (!existe) {
      throw new Error(`El nombre no está registrado`);
    }
    req.req.productobd = existe;
  }

};
module.exports = { productoHelper};
