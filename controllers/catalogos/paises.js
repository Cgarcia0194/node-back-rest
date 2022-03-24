const {
  mensaje,
  response
} = require("../../helpers");

const {
  Pais
} = require("../../models");

//función que sirve para registrar un pais
const crearPais = async (req, res = response) => {
  const {
    txtNombre,
    txtAbreviatura
  } = req.body;

  const paisDB = await Pais.findOne({
    nombre: txtNombre
  });

  if (paisDB) {
    return mensaje(res, 400, `El nombre del pais '${txtNombre}' ya está registrado`);
  }

  const abrevMayus = txtAbreviatura.toUpperCase();

  const data = {
    nombre: txtNombre,
    abreviatura: abrevMayus,
    usuario: req.usuario._id
  };

  const pais = new Pais(data);

  await pais.save();

  return mensaje(res, 200, pais);
};

//actualizar pais
const actualizarPais = async (req, res = response) => {
  const {
    idPais
  } = req.params;

  const {
    txtNombre,
    txtAbreviatura
  } = req.body;

  const paisDB = await Pais.findOne({
    nombre: txtNombre
  });

  if (paisDB) {
    return mensaje(res, 400, `El nombre del pais '${txtNombre}' ya existe`);
  }

  const abrevMayus = txtAbreviatura.toUpperCase();

  const data = {
    nombre: txtNombre,
    abreviatura: abrevMayus
  };

  const pais = await Pais.findByIdAndUpdate(idPais, data, {
    new: true,
  });

  return mensaje(res, 200, pais);
};

//eliminar pais
const eliminarPais = async (req, res = response) => {
  const {
    idPais
  } = req.params;

  const paisEliminado = await Pais.findByIdAndUpdate(idPais, {
    estatus: "Inactivo",
  }, {
    new: true
  });

  return mensaje(res, 200, paisEliminado);
};

//obtener paises - paginado - total- populate
const consultarPaisesActivos = async (req, res = response) => {
  const {
    limite = 10, desde = 1
  } = req.query; //valores que mando en la url para saber desde y el límite de registros que quiero

  const query = {
    estatus: "Activo",
  };

  const [total, paises] = await Promise.all([
    Pais.countDocuments(query), //hace un conteo de los registros de la tabla
    Pais.find(query) //find trae los registros de la tabla si no hay limit ni skip traerá toooodos
    .populate("usuario", ["nombre", "correo"]) //extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
    .skip(Number(desde - 1)) //skip sirve para saltar
    .limit(Number(limite)), //limit es para limitar con un número
  ]);

  return mensaje(res, 200, {
    total,
    paises
  });
};

//obtener paises - populate
const consultarPais = async (req, res = response) => {
  const {
    idPais
  } = req.params;

  const pais = await Pais.findById(idPais).populate("usuario", [
    "nombre, correo",
  ]);

  if (!pais) {
    return mensaje(res, 400, `No se ha encontrado el pais con el id ${id}, tal vez está inactivo o no existe`);
  }

  return mensaje(res, 200, {
    pais
  });
};

module.exports = {
  crearPais,
  actualizarPais,
  eliminarPais,
  consultarPaisesActivos,
  consultarPais
};