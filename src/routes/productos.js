
const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos.js");
const router = express.Router();
const { httpProducto } = require("../controllers/productos.js");
const { productoHelper } = require("../helpers/productos.js");
const { usuarioHelper } = require("../helpers/usuarios.js");
const { validarJWT } = require('../middleware/validarJWT');
const { isMongoId } = require("validator");



router.get('/listar',[
    validarJWT
],httpProducto.listarProductos);

router.get('/istarActivos',[
    validarJWT
],httpProducto.listarProductosActivos);

router.get('/listarInactivos',[
    validarJWT
], httpProducto.listarProductosInactivos);

router.get('/productos/bajo-stock-minimo', [
    validarJWT
],httpProducto. listarProductosBajoStock);

router.get('/productosPrecio-mayor-a/:precio', [
    validarJWT,
    check('precio', 'El precio es obligatorio').notEmpty(),
    check('precio', 'El precio debe ser un número válido').isNumeric(),
    validarCampos

], httpProducto.listarProductosPorPrecio);

router.get('/productos/:id', [
    validarJWT,
    check('id', 'ID de producto inválido').isMongoId(),
    check("id","lllll").custom(productoHelper.existeProductoID),
    validarCampos
], httpProducto.obtenerProductoPorId);


router.post('/', [
    validarJWT,
    check("usuario", 'el usuario es invalido').notEmpty(),
    check('usuario').custom(usuarioHelper.existeUsuarioID),
    check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
    check("nombre").custom(productoHelper.existeNombreProducto),
    check('nombre', 'El nombre del producto debe tener entre 2 y 50 caracteres').isLength({ min: 2, max: 50 }),
    check('precio', 'El precio es obligatorio').notEmpty(),
    check('precio', 'El precio del producto debe ser un número válido').isNumeric(),
    check('precio', 'El precio del producto debe ser mayor que cero').custom((value) => value > 0),
    check('cantidad', 'La cantidad  es obligatoria').notEmpty(),
    check('cantidad', 'La cantidad del producto debe ser un número válido').isNumeric(),
    check('cantidad', 'La cantidad del producto debe ser un número entero mayor que cero').custom((value) =>  value > 0),
    check('stockminimo', 'el stock es obligatorio').notEmpty(),
    check('stockminimo', 'El stock minimo del producto debe ser un número válido').isNumeric(),
    check('stockminimo', 'El stock minimo del producto debe ser un número entero mayor o igual que cero').custom((value) => value > 0 ),
    validarCampos
], httpProducto.insertarProducto);

router.put('/modificarProductos/:id', [
    validarJWT,
    check("usuario", 'el usuario es invalido').isMongoId,
    check('usuario').custom(usuarioHelper.existeUsuarioID),
    check('id', 'ID de producto inválido').isMongoId(),
    check("id").custom(productoHelper.existeProductoID),
    check('id', 'ID de producto inválido').isMongoId(),
    check("id").custom(productoHelper.existeProductoID),
    check('nombre').optional().notEmpty().custom(productoHelper.existeNombreProducto),
    check('nombre').optional().isLength({ min: 2, max: 50 }),
    
    check('precio').optional().isNumeric().custom((value, { req }) => {
        if (value <= 0 && req.body.precio !== undefined) {
            throw new Error('El precio del producto debe ser mayor que cero');
        }
        return true;
    }),
    check('cantidad').optional().isNumeric().custom((value, { req }) => {
        if (value <= 0 && req.body.cantidad !== undefined) {
            throw new Error('La cantidad del producto debe ser un número entero mayor que cero');
        }
        return true;
    }),
    check('stockminimo').optional().isNumeric().custom((value, { req }) => {
        if (value < 0 && req.body.stockminimo !== undefined) {
            throw new Error('El stock mínimo del producto debe ser un número entero mayor o igual que cero');
        }
        return true;
    }),
    validarCampos
], httpProducto.modificarProducto);


router.put('/productosActivar/:id', [
    validarJWT,
    check('id', 'ID de producto inválido').isMongoId(),
    check("id").custom(productoHelper.existeProductoID),
    validarCampos

], httpProducto.activarProducto);

router.put('/productosDesactivar/:id', [
    validarJWT,
    check('id', 'ID de producto inválido').isMongoId(),
    check("id").custom(productoHelper.existeProductoID),
    validarCampos

], httpProducto.desactivarProducto);


module.exports = router;