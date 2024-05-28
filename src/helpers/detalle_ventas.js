const Detalle = require("../models/detalle_ventas");

const DetalleHelper = {
    existeDetalleID: async (id, req) => {
        const existe = await Detalle.findById(id);
        if (!existe) {
            throw new Error(`Registro no existe ${id}`);
        }

        req.req.detallebd = existe;
    },
};
module.exports = { DetalleHelper };
