const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos.js");
const router = express.Router();
const { httpCliente } = require("../controllers/clientes.js");
const { clienteHelper } = require("../helpers/clientes.js");
const { validarJWT } = require('../middleware/validarJWT');

router.get("/listar", [
  validarJWT,
],httpCliente.listarClientes);

router.get("/listarActivos", [
  validarJWT,
],httpCliente.listarClientesActivos);
router.get("/listarInactivos", httpCliente.listarClientesInactivos);

router.get("/clientes/:id",[
  validarJWT,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(clienteHelper.existeClienteID),
    validarCampos,
    
  ],httpCliente.obtenerClientePorId);

router.post("/", [
  validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("documento", "El documento es obligatorio").notEmpty(),
    check("documento", "El documento debe tener al menos 10 caracteres").isLength({ min: 10 , max:10 }),
    check("documento").custom(clienteHelper.existeDocumento), 
    check("direccion", "La dirección es obligatoria").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(clienteHelper.existeEmail),
    check("fecha_compra", "La fecha es obligatoria").notEmpty(),
    validarCampos,
], httpCliente.insertarCliente);

router.put("/editarCliente/:id", [
  validarJWT,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(clienteHelper.existeClienteID),
    check("nombre").optional().notEmpty(), 
    check("documento").optional().notEmpty(),
    check("documento").optional().isLength({ min: 10, max: 10 }).withMessage("El documento debe tener exactamente 10 caracteres"), 
    check("documento").optional().custom(clienteHelper.existeDocumento), 
    check("direccion").optional().notEmpty(), 
    check("email").optional().notEmpty(), 
    check("email").optional().isEmail().withMessage("El email no es válido"), 
    check("email").optional().custom(clienteHelper.existeEmail),
    check("fecha_compra").optional().notEmpty(), 
    validarCampos,

], httpCliente.modificarCliente);


router.put("/clientesDesactivar/:id",[
  validarJWT,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(clienteHelper.existeClienteID),
    validarCampos,

  ],httpCliente.desactivarCliente);

router.put("/clientesActivar/:id",[
  validarJWT,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(clienteHelper.existeClienteID),
    validarCampos,

  ],httpCliente.activarCliente);

module.exports = router;
