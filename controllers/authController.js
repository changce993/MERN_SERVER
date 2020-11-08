const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

module.exports = {
    autenticarUsuario: async (req,res) => {
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            res.status(400).json({errores: errores.array()})
        }

        const {email, password} = req.body;

        try {
            let usuario = await Usuario.findOne({ email });

            if(!usuario){
                return res.status(400).json({msg: 'El usuario no existe'})
            }

            let passwordCorrect = await bcryptjs.compare(password, usuario.password)

            if(!passwordCorrect){
                return res.status(400).json({msg: 'La contraseña es incorrecta'})
            }

 

            const payload = {
                usuario: {
                    id: usuario.id
                }
            }

            jwt.sign( payload, process.env.SECRETA, {
                expiresIn: 3600 // 1 hora
            }, (error, token) => {
                if(error) throw error

                res.json({token})
            })

        } catch (error) {
            console.log(error)
        }
    },

    usuarioAutenticado: async (req,res) => {
        try {
            const usuario = await Usuario.findById(req.usuario.id).select('-password');
            res.json({ usuario });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg : 'Hubo un error' })
            
        }
    }
}