const {
    DataTypes
} = require("sequelize");

const {
    dbConnection
} = require("../../DB/config");

const Categoria = dbConnection.define('Categorias', {
    nombre: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },
    estatus: {
        type: DataTypes.ENUM,
        values: ['Activo', 'Inactivo'],
        defaultValue: 'Activo',
        required: true
    },
    usuario: {
        type: DataTypes.INTEGER,
        required: true
    }
});

module.exports = Categoria;