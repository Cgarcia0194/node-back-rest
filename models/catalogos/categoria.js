const {
    Schema,
    model
} = require('mongoose');
const moment = require('moment'); 

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estatus: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo',
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

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Categoria = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//categoriaSchema = es el esquema/modelo que se mandará
module.exports = model('Categoria', categoriaSchema);