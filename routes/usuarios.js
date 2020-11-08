const express = require('express')
const router = express.Router();
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuarioController')

// router para los usuarios
// /api/usuarios
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6})
]
, usuarioController.crearUsuario)

module.exports = router;