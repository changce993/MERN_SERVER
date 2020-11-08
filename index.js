const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');
const proyectosRoutes = require('./routes/proyectos');
const tareasRoutes = require('./routes/tareas');

// creando el servidor de express
const app = express();

//conectando a la base de datos
conectarDB();

app.use(cors());

app.use( express.json({extend : true}));

// puerto de la app
const PORT = process.env.PORT || 4000

// Routas de la app
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes);

// arrancando la app
app.listen(PORT, '0.0.0.0', () => {
    console.log(`el servidor esta funcionando en el puerto ${PORT}`)
}); 