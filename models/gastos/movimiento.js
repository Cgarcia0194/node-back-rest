const {
    Schema,
    model
} = require('mongoose');
const moment = require('moment');

const movimientoSchema = Schema({
    concepto: {
        type: String,
        required: [true, 'El concepto es obligatorio']
    },
    total: {
        type: Number,
        required: [true, 'El total es obligatoria']
    },
    fecha_movimiento: {
        type: Date,
        default: moment.utc(Date.now()).format("YYYY-MM-DD"),
        required: [true, 'La fecha del movimiento es obligatoria']
    },
    cantidad_meses: {
        type: Number,
        required: [true, 'La cantidad de meses es obligatoria'],
        default: 1
    },
    liquidado: {
        type: String,
        enum: ['Si', 'No'],
        default: 'No',
    },
    fecha_liquidacion: {
        type: Date
    },
    metodo_liquidacion: {
        type: String,
        enum: ['Transferencia', 'Efectivo', 'Otro'],
    },
    cantidad_liquidacion: {
        type: Number,
        required: [true, 'La cantidad de liquidación es obligatoria'],
        default: 1
    },
    metodo_pago: {
        type: String,
        enum: ['Transferencia', 'Efectivo', 'Tarjeta Banamex', 'Tarjeta Nu', 'Otro'],
    },
    observacion: {
        type: String,
        required: [true, 'La observación es obligatoria'],
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    estatus: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
        required: true
    },
    fecha_registro: {
        type: Date,
        default: moment.utc(Date.now()).format("YYYY-MM-DD")
    },
});

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Movimiento = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//categoriaSchema = es el esquema/modelo que se mandará
module.exports = model('Movimiento', movimientoSchema);