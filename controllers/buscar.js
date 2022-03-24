const {
    ObjectId
} = require('mongoose').Types;
const {
    mensaje,
    response
} = require('../helpers');
const {
    Categoria,
    Producto,
    Usuarios
} = require('../models');

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

/**
 * Función que busca para buscar categorias por id, 
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //true false

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);

        return mensaje(res, 200, ((categoria) ? [categoria] : [{
            "info": "No hay información disponible"
        }]));
    }

    const regex = new RegExp(termino, 'i'); //es una expresión regular para hacer la búsqueda de tipo no tane estricta

    const categorias = await Categoria.find({
        $or: [{
            nombre: regex,
            estatus: 'Activo'
        }]
    });

    return mensaje(res, 200, (categorias ? {
        "results": categorias
    } : [{
        "info": "No hay información disponible"
    }]));
};

/**
 * Función que sirve para buscar productos por id, nombre o descripción
 * @param {*} termino 
 * @param {*} res 
 * @returns 
 */
const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //true false

    if (esMongoId) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');

        return res.json((producto) ? [producto] : []);
    }

    const regex = new RegExp(termino, 'i'); //es una expresión regular para hacer la búsqueda de tipo no tane estricta

    const productos = await Producto.find({
            $or: [{
                nombre: regex
            }, {
                descripcion: regex
            }], //$or es de mongo para hacer un or
            $and: [{
                estatus: 'Activo'
            }]
        })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');

    return mensaje(res, 200, {
        results: productos
    });
};

/**
 * Función que sirve para buscar a los usuarios 
 * @param {*} termino : es por como se va buscar, si por id, nombre o por correo
 * @param {*} res 
 */
const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //true false

    //verifica que sea un id lo que se está recibiendo en termino
    if (esMongoId) {
        const usuario = await Usuarios.findById(termino);

        return res.json((usuario) ? [usuario] : []);
    }

    const regex = new RegExp(termino, 'i'); //es una expresión regular para hacer la búsqueda de tipo no tane estricta

    const usuarios = await Usuarios.find({
        $or: [{
            nombre: regex
        }, {
            correo: regex
        }], //$or es de mongo para hacer un or
        $and: [{
            estado: true
        }]
    });

    return mensaje(res, 200, {
        results: usuarios
    });
};

/**
 * Función que sirve para buscar por diferentes colecciones
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const buscar = (req, res = response) => {
    const {
        coleccion,
        termino
    } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return mensaje(res, 400, `Las colecciones permitidas son ${coleccionesPermitidas}`);
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            return mensaje(res, 500, `Se me olvidó hacer la búsqueda ${coleccion}`);
    }
};

module.exports = {
    buscar
};