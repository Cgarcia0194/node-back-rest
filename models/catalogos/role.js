const {Schema, model} = require('mongoose');

const rolesSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Roles = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//rolesSchema = es el esquema/modelo que se mandará
module.exports = model('Role', rolesSchema);