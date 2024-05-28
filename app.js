const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const usuarioRoutes = require('./src/routes/usuarios.js');
const clienteRoutes = require('./src/routes/clientes.js');
const productoRoutes = require('./src/routes/productos.js')
const carritoRoutes = require('./src/routes/carrito.js')
const detalleRoutes = require('./src/routes/detalle_ventas.js') 
const ventasRoutes = require('./src/routes/ventas.js') 

const app = express();
dotenv.config(); 
app.use(express.json());
app.use(cors());

app.use('/api/carrito', carritoRoutes)
app.use('/api/producto', productoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/detalle', detalleRoutes); 
app.use('/api/ventas', ventasRoutes); 

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!')); 
});












