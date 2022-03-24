const {
    Schema,
    model
} = require("mongoose");
const moment = require("moment");

const estadoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    clave: {
        type: Number,
        required: [true, "La clave es obligatoria"],
    },
    abreviatura: {
        type: String,
        required: [true, "La abreviatura es obligatoria"],
    },
    estatus: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo",
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: "Paises",
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    fecha_registro: {
        type: Date,
        default: moment.utc(Date.now()).format("YYYY-MM-DD"),
    },
});

//se exporta con la función de model, lo que ayuda a ponerlo en una colección y el nombre
//Estados = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//estadoSchema = es el esquema/modelo que se mandará
module.exports = model("Estados", estadoSchema);