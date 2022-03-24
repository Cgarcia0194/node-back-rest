const {Schema,model} = require('mongoose');

//Función que sirve para crear un esquema con los campos que va usar la tabla
const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasenia: {
        type: String,
        required: [true, 'La constraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, '']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        // required: true
    },
});

//función que sirve para desestructurar el objeto usuarioSchema y quitar el __v y contrasenia
usuarioSchema.methods.toJSON = function () {
    const {__v, contrasenia, _id, ...usuarioRest} = this.toObject();//genera un objeto con los valores de la instancia a usuarioSchema
    usuarioRest.uid = _id;// se convierte el campo _id por uid
    
    return usuarioRest;
}

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Usuarios = es el nombre del model y debe ser en plural
//usuarioSchema = es el esquema/modelo que se mandará
module.exports = model('Usuarios', usuarioSchema);