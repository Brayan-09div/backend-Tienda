const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    documento: { type: String, required: true ,min:10,unique:true},
    direccion: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    estado: { type: Number, required: true, default: 1 },
    fecha_compra: { type: Date, required: true},
}, { timestamps: true })


module.exports= mongoose.model("Cliente", clienteSchema)



//get()//listar todo
// get//listar por un id
// listar activos,
//listar inactivos
// post//insertar
// put//modificar
// put//activar
// put//desactivar