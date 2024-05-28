const Venta = require("../models/ventas");

const VentaHelper = {
    existVentaID: async (id, req) => {
        const existe = await Venta.findById(id);
        if (!existe) {
            throw new Error(`Registro no existe ${id}`);
        }
        req.req.ventabd = existe;
    },
};
module.exports = { VentaHelper };
