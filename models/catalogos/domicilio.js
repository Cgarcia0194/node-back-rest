const { Schema, model } = require("mongoose");
const moment = require("moment");

_id;
calle;
numero_exterior;
numero_interior;
colonia;
codigo_postal;
calle_uno;
calle_dos;
numero_telefono;
localidad;
persona;
estatus;
fecha_registro;

const domicilioSchema = Schema({
  calle: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  numero_exterior: {
    type: String,
    required: [true, "El número exterior es obligatorio"],
  },
  numero_interior: {
    type: String
  },
  colonia: {
    type: String,
    required: [true, "La colonia es obligatoria"],
  },
  codigo_postal: {
    type: String,
    required: [true, "El código postal es obligatorio"],
  },
  calle_uno: {
    type: String,
    required: [true, "La calle es obligatorio"],
  },
  calle_dos: {
    type: String
  },
  estatus: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo",
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
//Domicilio = es el nombre que tendrá la tabla a donde se guardará, si no está creada lo crea con el nombre
//domicilioSchema = es el esquema/modelo que se mandará
module.exports = model("Domicilio", domicilioSchema);
