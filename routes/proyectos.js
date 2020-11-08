const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const proyectosController = require('../controllers/proyectosController')
const auth = require('../middlewares/auth')

// router para los proyectos
// /api/proyectos
router.get('/', auth, proyectosController.obtenerProyectos)

// /api/proyectos
router.post('/', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()], proyectosController.crearProyecto)

// /api/proyectos/:id
router.put('/:id', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()], proyectosController.actualizarProyecto)

// /api/proyectos/:id
router.delete('/:id', auth, [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()], proyectosController.eliminarProyecto)

module.exports = router;