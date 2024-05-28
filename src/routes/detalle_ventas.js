const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpDetalle } = require('../controllers/detalle_ventas.js')
const { DetalleHelper } = require('../helpers/detalle_ventas.js');
const { productoHelper } = require('../helpers/productos.js');
const { VentaHelper} = require('../helpers/ventas.js');
const { validarJWT } = require('../middleware/validarJWT');


router.get('/listarDetalle/:idventa', [
    validarJWT,
    check('idventa', 'No es un ID válido').isMongoId(),
    check('idventa').custom(VentaHelper.existVentaID),
    validarCampos
], httpDetalle.listarDetalleVentaPorIdVenta);

router.post('/', [
    validarJWT,
    check('idventa', 'No es un ID válido').isMongoId(),
    check('idventa').custom(VentaHelper.existVentaID),
    check('idproductos', 'No es un ID válido').isMongoId(), // Corregir aquí
    check('idproductos').custom(productoHelper.existeProductoID), // Corregir aquí
    check('cantidad', 'La cantidad es obligatoria').notEmpty(),
    check('cantidad', 'La cantidad tiene que ser un número').isNumeric(), // Corregir aquí
    check('descuento', 'El descuento tiene que ser un número').isNumeric(), // Corregir aquí
    validarCampos
], httpDetalle.insertarDetalleVenta);

router.put('/modificarDetalle/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(DetalleHelper.existeDetalleID),
    check('cantidad').optional().notEmpty().withMessage('La cantidad es obligatoria').isNumeric().withMessage('La cantidad tiene que ser un número'),
    check('descuento').optional().isNumeric().withMessage('El descuento tiene que ser un número'),
    validarCampos
], httpDetalle.modificarDetalleVenta);

router.delete('/eliminarDetalle/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(DetalleHelper.existeDetalleID),
    validarCampos
], httpDetalle.eliminarDetalleVenta);


module.exports = router;

