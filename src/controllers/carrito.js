const Carrito = require('../models/carrito.js');

const httpCarrito = {
    listarCarritoPorCliente: async (req, res) => {
        const clienteId = req.params.clienteId;
        try {
            const carrito = await Carrito.find({ cliente: clienteId }).populate('productos', 'nombre');
            res.json(carrito);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    insertarElementoAlCarrito: async (req, res) => {
        const { cliente, productos, cantidad } = req.body;
        const valor = cantidad * req.productobd.precio;
        try {
            const nuevoElemento = new Carrito({ cliente, productos, cantidad, valor });
            await nuevoElemento.save();
            res.status(201).json(nuevoElemento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    eliminarElementoDelCarrito: async (req, res) => {
        const carritoId = req.params.carritoId;
        try {
            await Carrito.findByIdAndDelete(carritoId);
            res.json({ message: 'Carrito eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};


module.exports = {httpCarrito}