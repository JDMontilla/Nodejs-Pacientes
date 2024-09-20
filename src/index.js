const express = require('express'); // Importa el módulo Express
const app = express(); // Crea una instancia de la aplicación Express
const morgan = require('morgan'); // Importa el módulo Morgan para el registro de solicitudes HTTP
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }))

// Settings
app.set('port', process.env.PORT || 3006); // Establece el puerto en el que el servidor escuchará: usa el puerto definido en el entorno o 3006 por defecto
app.set('json spaces', 2); // Configura el espaciado en 2 para las respuestas JSON formateadas

// Middlewares
app.use(morgan('dev')); // Usa Morgan en modo 'dev' para el registro detallado de solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: false })); // Middleware para analizar solicitudes con datos codificados en la URL (formulario) sin extender las funcionalidades de codificación
app.use(express.json()); // Middleware para analizar las solicitudes entrantes con payloads JSON

// Routes
app.use(require('./routes/pacientes')); // Usa las rutas definidas en './routes/pacientes'
app.use('/pacientes', require('./routes/pacientes')); // Usa las rutas definidas en './routes/pacientes' con el prefijo '/pacientes'
app.use('/crear', require('./routes/pacientes'));
app.use('/modificar/:id', require('./routes/pacientes'));
app.use('eliminar/:id/', require('./routes/pacientes'));
app.use('paciente/:id/', require('./routes/pacientes'));

app.use('/medico', require('./routes/medico'));
app.use(require('./routes/medico'))

// Empezando el servidor
app.listen(app.get('port'), () => { // Inicia el servidor en el puerto configurado
    console.log(`Servidor en el puerto ${app.get('port')}`); // Imprime en la consola el puerto en el que está escuchando el servidor
});