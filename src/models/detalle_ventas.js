const mongoose = require('mongoose');

const detalle_ventasSchema = new mongoose.Schema({
    idventa:{type:mongoose.Schema.Types.ObjectId,ref:'Venta'},
    idproductos: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, default: 0 },
    descuento: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
}, { timestamps: true })
 
module.exports = mongoose.model("DetalleVenta", detalle_ventasSchema);



// //detalles ventas
// get//listar por un id venta
// post//insertar
// put//modificar