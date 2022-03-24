const {
  mensaje,
  response
} = require("../../helpers");
const {
  Colonia
} = require("../../models");

//Función que crea la colonia
const crearColonia = async (req, res = response) => {
  const {
    nombre,
    codigo_postal
  } = req.body;

  const coloniaDB = await Colonia.findOne({
    nombre,
    codigo_postal,
  });

  if (coloniaDB) {
    return mensaje(res, 400, `El nombre de la colonia '${nombre}' ya está registrado`);
  }

  const data = {
    nombre,
    codigo_postal,
    usuario: req.usuario._id,
  };

  const colonia = new Colonia(data);

  await colonia.save();

  return mensaje(res, 200, colonia);
};

//actualizar colonia
const actualizarColonia = async (req, res = response) => {
  const {
    idColonia
  } = req.params;

  const {
    nombre,
    codigo_postal
  } = req.body;

  const data = {
    idColonia,
    nombre,
    codigo_postal,
  };

  const colonia = await Colonia.findByIdAndUpdate(idColonia, data, {
    new: true,
  }); //LO ENCUENTRA Y ACTUALIZA

  return mensaje(res, 200, colonia);
};

//eliminar colonia
const eliminarColonia = async (req, res = response) => {
  const {
    idColonia
  } = req.params;

  //Elimina la colonia de manera física
  //const colonia = await Colonia.findByIdAndDelete(id);
  const coloniaEliminada = await Colonia.findByIdAndUpdate(
    idColonia, {
      estatus: "Inactivo",
    }, {
      new: true
    }
  );

  return mensaje(res, 200, coloniaEliminada);
};

//obtener colonias - paginado - total- populate
const consultarColoniasActivas = async (req, res = response) => {
  const {
    limite = 10, desde = 1
  } = req.query; //valores que mando en la url para saber desde y el límite de registros que quiero

  const query = {
    estatus: "Activo",
  };

  const [total, colonias] = await Promise.all([
    Colonia.countDocuments(query), //hace un conteo de los registros de la tabla
    Colonia.find(query) //find trae los registros de la tabla si no hay limit ni skip traerá toooodos
    .populate("usuario", ["nombre", "correo"]) //extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
    .skip(Number(desde - 1)) //skip sirve para saltar
    .limit(Number(limite)), //limit es para limitar con un número
  ]);

  return mensaje(res, 200, {
    total,
    colonias
  });
};

//obtener colonia - populate
const consultarColonia = async (req, res = response) => {
  const {
    idColonia
  } = req.params;

  const colonia = await Colonia.findById(idColonia).populate("usuario", [
    "nombre, correo",
  ]);

  if (!colonia) {
    return mensaje(
      res,
      400,
      `No se ha encontrado la colonia con el id ${id}, tal vez está inactivo o no existe`
    );
  }

  return mensaje(res, 200, {
    colonia
  });
};

module.exports = {
  crearColonia,
  actualizarColonia,
  eliminarColonia,
  consultarColoniasActivas,
  consultarColonia,
};