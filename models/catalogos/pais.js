const { Schema, model } = require("mongoose");
const moment = require("moment");

const paisSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
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
//Paises = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//paisSchema = es el esquema/modelo que se mandará
module.exports = model("Paises", paisSchema);
