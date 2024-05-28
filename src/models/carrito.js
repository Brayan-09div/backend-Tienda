const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente'},
    productos:{type:mongoose.Schema.Types.ObjectId,ref:'Producto'},
    cantidad:{type:Number, require:true},
    valor:{type:Number, default: 0}
}, { timestamps: true })


module.exports= mongoose.model("Carrito", carritoSchema)


// get listar carrrito x cliente
// post//insertar
// delete
