const {
    DataTypes
} = require("sequelize");

const {
    dbConnection
} = require("../../DB/config");

const Usuario = dbConnection.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    correo: {
        type: DataTypes.STRING,
        required: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
    },
    contrasenia: {
        type: DataTypes.STRING,
        required: true
    },
    persona: {
        type: DataTypes.INTEGER,
        required: true
    },
    estatus: {
        type: DataTypes.ENUM,
        values: ['Activo', 'Inactivo'],
        defaultValue: 'Activo',
        required: true
    }
});

module.exports = Usuario;