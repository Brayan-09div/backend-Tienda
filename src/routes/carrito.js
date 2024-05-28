const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpCarrito } = require('../controllers/carrito.js')
const {CarrritoHelper} = require('../helpers/carrito.js');
const { productoHelper } = require('../helpers/productos.js');
const { clienteHelper } = require('../helpers/clientes.js');


// Rutas para operaciones del carrito
router.get('/carritolistaidCliente/:clienteId',[
    check('cliente', 'el cliente es invalido').isMongoId(),
    check('cliente').custom(clienteHelper.existeClienteID),
    validarCampos
],httpCarrito.listarCarritoPorCliente);



router.post('/',[
    check('cliente','el cliente es obligatorio').notEmpty(),
    check('cliente').custom(clienteHelper.existeClienteID),
    check('productos' ,'el producto es obligatori').isMongoId(),
    check('productos').custom(productoHelper.existeProductoID),
    check('cantidad', 'La cantidad  es obligatoria').notEmpty(),
    check('cantidad', 'La cantidad  debe ser un número válido').isNumeric(),
    check('cantidad', 'La cantidad  debe ser un número entero mayor que cero').custom((value) => value > 0),
    validarCampos 
],httpCarrito.insertarElementoAlCarrito);


router.delete('/carritoEliminar/:id', [
    check('id', 'id invalido').isMongoId(),
    check('id').custom(CarrritoHelper.existCarritoID), 
    validarCampos
]
,httpCarrito.eliminarElementoDelCarrito);

module.exports = router;
