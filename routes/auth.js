const express = require('express')
const router = express.Router();
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const authController = require('../controllers/authController')

// router para el auth
// /api/auth
router.post('/', authController.autenticarUsuario)

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;