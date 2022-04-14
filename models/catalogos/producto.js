const {
    DataTypes
} = require("sequelize");

const {
    dbConnection
} = require("../../DB/config");

const Producto = dbConnection.define('Productos', {
    nombre: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: DataTypes.STRING,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: DataTypes.DOUBLE,
        required: [true, 'El precio es obligatorio']
    },
    cantidad: {
        type: DataTypes.DOUBLE,
        required: [true, 'La cantidad es obligatoria']
    },
    categoria: {
        type: DataTypes.INTEGER,
        required: true,
        required: [true, 'La categoria es obligatoria']
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

module.exports = Producto;