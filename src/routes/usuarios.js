const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.js');
const router = express.Router();
const { httpUsuarios } = require('../controllers/usuarios.js')
const { usuarioHelper } = require('../helpers/usuarios.js')
const { validarJWT } = require('../middleware/validarJWT');

router.get('/listar',[
    validarJWT,
], httpUsuarios.listarUsuarios)

router.get('/listarActivos',[
    validarJWT,
],httpUsuarios.listarUsuariosActivos)

router.get('/listarInactivos',[
    validarJWT,
],httpUsuarios.listarUsuariosInactivos)


router.get('/listar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID), 
    validarCampos 
], httpUsuarios.obtenerUsuarioPorId);


router.post('/', [
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'Password no es válido').isLength({ min: 8 }),
    validarCampos
], httpUsuarios. insertarUsuario);


router.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.activarUsuario);

router.put('/inactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.desactivarUsuario);

router.post("/login", [
    check("email", "El el email es obligatorio").not().isEmpty(),
    check('email').custom(usuarioHelper.verificarEmail), 
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], httpUsuarios.login);

router.put('/cambiarContrasena/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('password', 'La nueva contraseña es obligatoria').not().isEmpty(),
    check('password', 'La nueva contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], httpUsuarios.cambiarContraseña);

router.put('/modificarUsuario/:id',[
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    validarCampos
],)

module.exports = router;

 