const {Sequelize} = require ("sequelize");

const sequelize = new Sequelize('centro_medico','postgres','3003394453',{
    host: 'localhost',
    dialect: 'postgres'
});

// Verificación de la conexión
sequelize.authenticate()// Se utiliza .authenticate() para probar si la conexión es correcta
    .then(() => { // .then() maneja los datos convertidos
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;