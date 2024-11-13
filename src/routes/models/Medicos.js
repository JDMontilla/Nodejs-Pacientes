const { DataTypes } = require("sequelize");
const sequelize = require("../../../BD/postgres.js");

const Medicos = sequelize.define("Medicos",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    nombre_medico: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    horario_entrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    horario_salida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: "medicos",
    timestamps: false,
  }
);

module.exports = Medicos;
