const {
    Schema,
    model
} = require('mongoose');
const moment = require('moment');

//Función que sirve para crear un esquema con los campos que va usar la tabla
const personaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido_paterno: {
        type: String,
        required: [true, 'El apellido paterno es obligatorio']
    },
    apellido_materno: {
        type: String
    },
    rfc: {
        type: String
    },
    curp: {
        type: String,
        required: [true, 'La CURP es obligatorio']
    },
    genero: {
        type: String,
        required: [true, 'El género es obligatorio'],
        enum: ['Hombre', 'Mujer', 'Sin especificar'],
        default: 'Sin especificar',
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio']
    },
    telefono_opcional: {
        type: String
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    edad: {
        type: Number,
        required: [true, 'La edad obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    google: {
        type: Boolean,
        default: false
    },
    estado_civil: {
        type: String,
        required: [true, 'El estado civil es obligatorio'],
        enum: ['Casado', 'Divorciado', 'Soltero', 'Unión libre', 'Viudo', 'Sin especificar'],
        default: 'Sin especificar',
    },
    nacionalidad: {
        type: String,
        required: [true, 'La nacionalidad es obligatoria']
    },
    img: {
        type: String
    },
    fecha_registro: {
        type: Date,
        default: moment.utc(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    }
});

//función que sirve para desestructurar el objeto personaSchema y quitar el __v y contrasenia
personaSchema.methods.toJSON = function () {
    const {
        __v,
        _id,
        ...personaRest
    } = this.toObject(); //genera un objeto con los valores de la instancia a personaSchema
    personaRest.uid = _id; // se convierte el campo _id por uid

    return personaRest;
}

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Persona = es el nombre del model y debe ser en plural
//personaSchema = es el esquema/modelo que se mandará
module.exports = model('Persona', personaSchema);