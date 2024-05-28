const mongoose = require('mongoose');

const ventasSchema = new mongoose.Schema({
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    fecha: { type: Date, required: true },
    ValorTotalVenta: { type: Number, default: 0 },
    activo: { type: Boolean, default: true },
    descuento: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Venta", ventasSchema);
