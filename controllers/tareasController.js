const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

module.exports = {
    crearTarea: async (req,res) => {

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({ erorres: errores.array() })
        }

        try {

            const { proyecto } = req.body; 

            const proyectoExiste = await Proyecto.findById(proyecto);

            if(!proyectoExiste){
                res.status(404).json({ msg: 'Proyecto no encontrado' })
            }

            if(proyectoExiste.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg : 'No autorizado'})
            }

            const tarea = new Tarea(req.body);
            await tarea.save();
            res.json({ tarea })
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor')
        }

    },
    obtenerTarea: async (req,res) => {

        try {

            const { proyecto } = req.query; 

            const proyectoExiste = await Proyecto.findById(proyecto);

            if(!proyectoExiste){
                res.status(404).json({ msg: 'Proyecto no encontrado' })
            }

            if(proyectoExiste.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg : 'No autorizado'})
            }

            const tareas = await Tarea.find({ proyecto }).sort({ creado : -1});
            res.json({ tareas });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor')
        }

    },
    actualizarTarea: async (req,res) => {

        try {

            const { proyecto, nombre, estado } = req.body; 

             let tarea = await Tarea.findById(req.params.id);

             if(!tarea){
                return res.status(404).json({msg : 'No existe esa tarea'})
             }



            const proyectoExiste = await Proyecto.findById(proyecto);

            if(proyectoExiste.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg : 'No autorizado'})
            }

            let nuevaTarea = {};
            nuevaTarea.nombre = nombre;
            nuevaTarea.estado = estado;

            tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {new : true});

            res.json({ tarea });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor')
        }

    },
    eliminarTarea: async (req,res) => {

        try {
            const { proyecto } = req.query ; 

            let tarea = await Tarea.findById(req.params.id);

            if(!tarea){
                return res.status(404).json({msg : 'No existe esa tarea'})
            }

            const proyectoExiste = await Proyecto.findById(proyecto);

            if(proyectoExiste.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg : 'No autorizado'})
            }

            await Tarea.findOneAndRemove({ _id : req.params.id });
            res.json({ msg: 'Tarea eliminada' });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }
}