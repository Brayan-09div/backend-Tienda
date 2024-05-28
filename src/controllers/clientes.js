const Cliente = require('../models/clientes.js');

const httpCliente = {
    // GET: Listar todos los clientes
    listarClientes: async (req, res) => {
        try {
            const clientes = await Cliente.find();
            res.json({ clientes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Obtener cliente por ID
    obtenerClientePorId: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findById(id);
            if (cliente)
                res.json({ cliente });
            else
                res.status(404).json({ msg: "Cliente no encontrado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar clientes activos
    listarClientesActivos: async (req, res) => {
        try {
            const clientesActivos = await Cliente.find({ estado: 1 });
            res.json({ clientesActivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET: Listar clientes inactivos
    listarClientesInactivos: async (req, res) => {
        try {
            const clientesInactivos = await Cliente.find({ estado: 0 });
            res.json({ clientesInactivos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST: Insertar cliente
    insertarCliente: async (req, res) => {
        const { nombre, documento, direccion, email, fecha_compra } = req.body;
        try {
            const cliente = new Cliente({nombre, documento, direccion, email, fecha_compra });
            await cliente.save();
            res.json({ cliente });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // PUT: Modificar cliente
    modificarCliente: async (req, res) => {
        const { id } = req.params;
        const { nombre, documento, direccion, email, fecha_compra } = req.body;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { nombre, documento, direccion, email, fecha_compra }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT: Desactivar cliente
    desactivarCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    // PUT: Activar cliente

    activarCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ cliente });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {httpCliente}
