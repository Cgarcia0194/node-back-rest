const {
    mensaje,
    response
} = require("../../helpers");

const {
    Estado
} = require("../../models");

//función que sirve para registrar un pais
const crearEstado = async (req, res = response) => {
    const {
        txtNombre,
        txtClave,
        txtAbreviatura,
        idPais
    } = req.body;

    const estadoDB = await Estado.findOne({
        nombre: txtNombre
    });

    if (estadoDB) {
        return mensaje(res, 400, `El nombre del estado '${txtNombre}' ya está registrado`);
    }

    const data = {
        nombre: txtNombre,
        clave: txtClave,
        abreviatura: txtAbreviatura,
        pais: idPais,
        usuario: req.usuario._id
    };

    const estado = new Estado(data);

    await estado.save();

    return mensaje(res, 200, estado);
};

//actualizar estado
const actualizarEstado = async (req, res = response) => {
    const {
        idEstado
    } = req.params;

    const {
        txtNombre,
        txtClave,
        txtAbreviatura,
        idPais
    } = req.body;

    const data = {
        nombre: txtNombre,
        clave: txtClave,
        abreviatura: txtAbreviatura,
        pais: idPais
    };

    const estado = await Estado.findByIdAndUpdate(idEstado, data, {
        new: true,
    });

    return mensaje(res, 200, estado);
};

//eliminar estado
const eliminarEstado = async (req, res = response) => {
    const {
        idEstado
    } = req.params;

    const estadoEliminado = await Estado.findByIdAndUpdate(idEstado, {
        estatus: "Inactivo",
    }, {
        new: true
    });

    return mensaje(res, 200, estadoEliminado);
};

//obtener estados - paginado - total- populate
const consultarEstadosActivos = async (req, res = response) => {
    const {
        limite = 10, desde = 1
    } = req.query; //valores que mando en la url para saber desde y el límite de registros que quiero

    const query = {
        estatus: "Activo",
    };

    const [total, estados] = await Promise.all([
        Estado.countDocuments(query), //hace un conteo de los registros de la tabla
        Estado.find(query) //find trae los registros de la tabla si no hay limit ni skip traerá toooodos
        .populate("usuario", ["nombre", "correo"]) //extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
        .populate("pais", ["nombre"]) //extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
        .skip(Number(desde - 1)) //skip sirve para saltar
        .limit(Number(limite)), //limit es para limitar con un número
    ]);

    return mensaje(res, 200, {
        total,
        estados
    });
};

//obtener estados - populate
const consultarEstado = async (req, res = response) => {
    const {
        idEstado
    } = req.params;

    const estado = await Estado.findById({
            _id: idEstado
        })
        .populate("usuario", ["nombre, correo", ])
        .populate("pais", ["nombre"]);

    if (!estado) {
        return mensaje(res, 400, `No se ha encontrado el estado con el id ${idEstado}, tal vez está inactivo o no existe`);
    }

    return mensaje(res, 200, {
        estado
    });
};

module.exports = {
    crearEstado,
    actualizarEstado,
    eliminarEstado,
    consultarEstadosActivos,
    consultarEstado
};