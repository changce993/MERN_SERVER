const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// creando el servidor de express
const app = express();

//conectando a la base de datos
conectarDB();

app.use(cors());

app.use( express.json({extend : true}));

// puerto de la app
const PORT = process.env.PORT || 4000

// Routas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancando la app
app.listen(PORT, '0.0.0.0', () => {
    console.log(`el servidor esta funcionando en el puerto ${PORT}`)
}); 