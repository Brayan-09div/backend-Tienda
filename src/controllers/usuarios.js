const Usuario = require("../models/usuarios.js");
const bcryptjs = require("bcrypt");
const { generarJWT } = require("../middleware/validarJWT.js");

const httpUsuarios = {
  // GET: Listar todos los usuarios
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json({ usuarios });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET: Listar usuario por ID
  obtenerUsuarioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) res.json({ usuario });
      else res.status(404).json({ msg: "Usuario no encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET: Listar usuarios activos
  listarUsuariosActivos: async (req, res) => {
    try {
      const usuariosActivos = await Usuario.find({ estado: 1 });
      res.json({ usuariosActivos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET: Listar usuarios inactivos
  listarUsuariosInactivos: async (req, res) => {
    try {
      const usuariosInactivos = await Usuario.find({ estado: 0 });
      res.json({ usuariosInactivos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST: Insertar usuario
  insertarUsuario: async (req, res) => {
    const { email, password } = req.body;
    const usuario = new Usuario({ email, password });
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
      usuario,
    });
  },

  // POST: Login de usuario
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Usuario.findOne({ email });
      if (!user) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      if (user.estado === 0) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      /////////pago o no pago    xxxxxxxx
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          msg: "Usuario / Password no son correctos",
        });
      }
      const token = await generarJWT(user._id);
      res.json({
        usuario: user,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el WebMaster",
      });
    }
  },
  
  //PUT CAMBIAR CONTRASEÑA
   cambiarContraseña: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; 
    try {
        const usuario = await Usuario.findById(id);
        if (usuario) {
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password, salt); 
            await usuario.save();
            res.json({ msg: "Contraseña actualizada correctamente" });
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 },
  // PUT: Modificar usuario
  modificarUsuario: async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findById(id);
      if (usuario) {
        usuario.email = email;
        usuario.password = password;
        await usuario.save();
        res.json({ msg: "Usuario modificado correctamente" });
      } else {
        res.status(404).json({ msg: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT: Activar usuario
  activarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.findByIdAndUpdate(id, { estado: 1 });
      res.json({ msg: "Usuario activado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT: Desactivar usuario
  desactivarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      await Usuario.findByIdAndUpdate(id, { estado: 0 });
      res.json({ msg: "Usuario desactivado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = { httpUsuarios };
