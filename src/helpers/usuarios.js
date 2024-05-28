const Usuario = require('../models/usuarios.js')

const usuarioHelper = {
    existeUsuarioID: async (id, req) => {
        const existe = await Usuario.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }
        req.req.usuariobd = existe
    },

    existeEmail: async (email, req) => {
        if (email) {
            const existe = await Usuario.findOne({ email })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.email !== req.req.usuariobd.email)
                        throw new Error(`Ya existe ese email en la base de datos!!! ${email}`)

                } else {
                    throw new Error(`Ya existe ese email en la base de datos!!! ${email}`)
                }
            }
        }
    },

    verificarEmail: async (email, req) => {

        const existe = await Usuario.findOne({ email });

        if (!existe) {
            throw new Error(`El email no está registrado`)
        }
        req.req.usuariobd = existe;
    },
}
module.exports = { usuarioHelper }