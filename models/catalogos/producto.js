const {
    Schema,
    model
} = require('mongoose');
const moment = require('moment');

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    estatus: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fecha_registro: {
        type: Date,
        default: moment.utc(Date.now()).format("YYYY-MM-DD")
    },
});

//Producto = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//productoSchema = es el esquema/modelo que se mandará
module.exports = model('Producto', productoSchema);