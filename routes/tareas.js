const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareasController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// router para las tareas
// /api/tareas
router.post('/', auth, [check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty()], tareaController.crearTarea);

router.get('/', auth, tareaController.obtenerTarea);

router.put('/:id', auth, tareaController.actualizarTarea);

router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
);

module.exports = router;