const {
    DataTypes
} = require("sequelize");

const {
    dbConnection
} = require("../../DB/config");

const Persona = dbConnection.define('Personas', {
    nombre: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },
    apellido_paterno: {
        type: DataTypes.STRING
    },
    apellido_materno: {
        type: DataTypes.STRING
    },
    rfc: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },
    curp: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },
    genero: {
        type: DataTypes.ENUM,
        values: ['Hombre', 'Mujer', 'Sin especificar'],
        defaultValue: 'Sin especificar',
        required: [true, 'El nombre es obligatorio']
    },
    telefono: {
        type: DataTypes.STRING,
        required: [true, 'El teléfono es obligatorio']
    },
    telefono_fijo: {
        type: DataTypes.STRING,
        required: [true, 'El teléfono fijo es obligatorio']
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    edad: {
        type: DataTypes.INTEGER,
        required: [true, 'La edad es obligatorio']
    },
    correo_electronico: {
        type: DataTypes.STRING,
        required: [true, 'El correo es obligatorio']
    },
    estado_civil: {
        type: DataTypes.INTEGER,
        required: [true, 'El estado civil es obligatorio']
    },
    nacionalidad: {
        type: DataTypes.INTEGER,
        required: [true, 'La nacionalidad es obligatoria']
    },
    municipio: {
        type: DataTypes.INTEGER,
        required: [true, 'El municipio es obligatorio']
    },
    imagen: {
        type: DataTypes.STRING,
        required: [true, 'La imagen es obligatoria']
    }
});

module.exports = Persona;