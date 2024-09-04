const { DataTypes } = require('sequelize');
const sequelize = require('../../../BD/postgres.js');

const Paciente = sequelize.define('Paciente', { // sequelize.define() es un metodo de sequelize que se utiliza para definir un modelo en la base de datos.
    identificacion: { // Define un campo llamado 'Identificación' en la tabla 'Pacientes'
        type: DataTypes.STRING, // El tipo de dato de este campo es STRING (VARCHAR en SQL)
        allowNull: false // Este campo es obligatorio y no puede ser nulo (NOT NULL en SQL)
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eps: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mora: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'pacientes', // Nombre de la tabla en la base de datos
    timestamps: false // Si no tienes campos de timestamps
});

module.exports = Paciente;