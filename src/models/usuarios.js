const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, default: "",min:8,max:15 },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true })


module.exports= mongoose.model("Usuario", usuarioSchema)


// USUARIOS
// listar todo
// listar por un id
//  listar activos,
// listar inactivos
//insertar
//login 
//cambio contraseña
// put//modificar
// put//activar
// put//desactivar
