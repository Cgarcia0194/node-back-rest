const {
    Categoria,
    Colonia,
    Estado,
    Pais,
    Persona,
    Producto,
    Role,
    Usuarios,
} = require('../models');

/**
 * Función que sirve para poder validar el nombre del rol que ya está registrado en la BD de la tabla roles
 * @param {*} nombre 
 */
const esRolValido = async (nombre = '') => {
    const existeRol = await Role.findOne({
        nombre
    });

    if (!existeRol) {
        throw new Error(`El rol '${nombre}' no está registrado en la base de datos`);
    }
};

/**
 * Función que sirve para poder buscar el correo en los usuarios ya registrados y que no se repita
 * @param {*} correo 
 */
const existeEmail = async (correo = '') => {
    //verificar el correo
    const existeCorreo = await Usuarios.findOne({
        correo
    });

    if (existeCorreo) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
};

/**
 * Función que sirve para buscar un usuario por su id
 * @param {*} idUsuario : es el id del usuario que se desea modificar
 */
const existeUsuarioPorId = async idUsuario => {
    //verificar el id del usuario
    const existeUsuario = await Usuarios.findById({
        _id: idUsuario
    });

    if (!existeUsuario) {
        throw new Error(`El id ${idUsuario} no existe`);
    }
};

/**
 * Función que sirve para buscar una categoria por nombre
 * @param {*} nombre se pasa el nuevo nombre de la categoria
 */
const existeCategoria = async (nombreCategoria = '') => {
    const nombre = nombreCategoria.toUpperCase();

    const existeCategoria = await Categoria.findOne({
        nombre
    });

    if (existeCategoria) {
        throw new Error(`La categoría '${nombre}' ya está registrada`);
    }
};

/**
 * Función que sirve para buscar una categoria por id
 * @param {*} idCategoria 
 */
const existeCategoriaPorId = async idCategoria => {
    //verificar el id de la categoria
    const existeCategoria = await Categoria.findById({
        _id: idCategoria
    });

    if (!existeCategoria) {
        throw new Error(`El id de la categoria ${idCategoria} no existe`);
    }
};

/**
 * Función que sirve para buscar un producto por id
 * @param {*} idProducto 
 */
const existeProductoPorId = async idProducto => {
    const existeProducto = await Producto.findById({
        _id: idProducto
    });

    if (!existeProducto) {
        throw new Error(`El id del producto ${idProducto} no existe`);
    }
};

/**
 * Función que sirve para buscar una colonia por id
 * @param {*} idColonia 
 */
const existeColoniaPorId = async idColonia => {
    const existeColonia = await Colonia.findById({
        _id: idColonia
    });

    if (!existeColonia) {
        throw new Error(`El id de la colonia ${idColonia} no existe`);
    }
};

/**
 * Función que sirve para buscar una colonia por id
 * @param {*} idPais 
 */
const existePaisPorId = async idPais => {
    const existePais = await Pais.findById({
        _id: idPais
    });

    if (!existePais) {
        throw new Error(`El id del pais ${idPais} no existe`);
    }
};

/**
 * Función que sirve para buscar un estado por id
 * @param {*} idEstado 
 */
const existeEstadoPorId = async idEstado => {
    const existeEstado = await Estado.findById({
        _id: idEstado
    });

    if (!existeEstado) {
        throw new Error(`El id del estado ${idEstado} no existe`);
    }
};

const existePersonaPorId = async idPersona => {
    const existePersona = await Persona.findById({
        _id: idPersona
    });

    if (!existePersona) {
        throw new Error(`El id de la persona ${idPersona} no existe`);
    }
};

/**
 * Validar las colecciones permitidas
 * @param {*} coleccion 
 * @param {*} colecciones 
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    //sirve para buscar en el arreglo que la colección que se manda esté entre las permitidas
    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La coleccion '${coleccion}' no es permitida [${colecciones}]`);
    }

    return true;
};

//se exportan las funciones para que sean usadas en otros archivos JS
module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeCategoriaPorId,
    existeProductoPorId,
    existeColoniaPorId,
    existePaisPorId,
    existeEstadoPorId,
    existePersonaPorId,
    coleccionesPermitidas,
};