const Venta = require('../models/ventas.js'); 
const Cliente = require('../models/clientes.js'); 

const httpVenta = {
    // Listar todas las ventas
    listarTodo: async (req, res) => {
        try {
            const ventas = await Venta.find();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener una venta por su ID
    obtenerPorId: async (req, res) => {
        try {
            const venta = await Venta.findById(req.params.id);
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas activas
    listarActivas: async (req, res) => {
        try {
            const ventasActivas = await Venta.find({ activo: true });
            res.json(ventasActivas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas inactivas
    listarInactivas: async (req, res) => {
        try {
            const ventasInactivas = await Venta.find({ activo: false });
            res.json(ventasInactivas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas de un cliente específico
    listarPorCliente: async (req, res) => {
        try {
            const ventasCliente = await Venta.find({ idcliente: req.params.idcliente });
            if (!ventasCliente || ventasCliente.length === 0) {
                return res.status(404).json({ message: 'No se encontraron ventas para este cliente' });
            }
            res.json(ventasCliente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Listar todas las ventas entre dos fechas
    listarPorRangoDeFechas: async (req, res) => {
        try {
            const { inicio, fin } = req.params;
            const ventasEnRango = await Venta.find({ fecha: { $gte: inicio, $lte: fin } });
            res.json(ventasEnRango);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Listar ventas con un valor superior a cierto valor
    listarPorValorSuperior: async (req, res) => {
        try {
            const ventasValorSuperior = await Venta.find({ valor: { $gt: req.params.valor } });
            res.json(ventasValorSuperior);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Calcular el total de ventas entre dos fechas
    calcularTotalPorRangoDeFechas: async (req, res) => {
        try {
            const { inicio, fin } = req.params;
            const totalVentas = await Venta.aggregate([
                {
                    $match: {
                        fecha: { $gte: new Date(inicio), $lte: new Date(fin) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$valor" }
                    }
                }
            ]);
            res.json(totalVentas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Calcular el total de descuento aplicado en todas las ventas
    calcularTotalDescuento: async (req, res) => {
        try {
            const totalDescuento = await Venta.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$descuento" }
                    }
                }
            ]);
            res.json(totalDescuento);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Insertar una nueva venta
     crear: async (req, res) => {
         const { idCliente, fecha, ValorTotalVenta } = req.body;
        try {

            const venta = new Venta({ idCliente, fecha, ValorTotalVenta });

            // Guarda la venta en la base de datos
            const nuevaVenta = await venta.save();

            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
    // Actualizar una venta por su ID
    actualizar: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Activar una venta por su ID
    activar: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { activo: true }, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Desactivar una venta por su ID
    desactivar: async (req, res) => {
        try {
            const venta = await Venta.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = {httpVenta}
