const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpVenta } = require('../controllers/ventas.js')
const { clienteHelper } = require('../helpers/clientes.js');
const { VentaHelper } = require('../helpers/ventas.js');
const { validarJWT } = require('../middleware/validarJWT');


router.get('/litarTodo', [
    validarJWT, 
],httpVenta.listarTodo);

router.get('/activas', [
    validarJWT,
],httpVenta.listarActivas);

router.get('/inactivas', [
    validarJWT, 
], httpVenta.listarInactivas);

router.get('/fechas/:inicio/:fin', [
    validarJWT, 
], httpVenta.listarPorRangoDeFechas);

router.get('/totalventas/:inicio/:fin', [
    validarJWT, 
], httpVenta.calcularTotalPorRangoDeFechas);

router.get('/totaldescuento', [
    validarJWT,
], httpVenta.calcularTotalDescuento);    

router.get('/valor/:valor', [
    validarJWT, 
    check('ValorTotalVenta', "el valor es invalido").isNumeric(),
    validarCampos
], httpVenta.listarPorValorSuperior);

router.get('/:id', [
    validarJWT, 
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.obtenerPorId);

router.get('/cliente/:idcliente', [
    validarJWT, 
    check('idcliente', 'ID de cliente es inválido').notEmpty(),
    check('idcliente').custom(clienteHelper.existeClienteID),
    validarCampos
], httpVenta.listarPorCliente);

router.post('/', [
    validarJWT, 
    check('idcliente', 'id es invalido').isMongoId(),
    check('idcliente').custom(clienteHelper.existeClienteID),
    check("fecha", "La fecha es obligatoria").notEmpty(),
    validarCampos
], httpVenta.crear);

router.put('/actualizar/:id', [
    validarJWT,
    check('id', 'ID de venta inválido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    check("fecha", "La fecha es obligatoria").optional().notEmpty(),
    validarCampos
], httpVenta.actualizar);

router.put('/activar/:id', [
    validarJWT,
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.activar);

router.put('/desactivar/:id', [
    validarJWT, 
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(VentaHelper.existVentaID),
    validarCampos
], httpVenta.desactivar);

module.exports = router;