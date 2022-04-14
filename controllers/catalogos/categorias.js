const {
    Categoria
} = require('../../models');
const {
    respuesta,
    response
} = require('../../helpers');

const {
    dbConnection
} = require("../../DB/config");

const {
    QueryTypes
} = require("sequelize");

//Función que inserta la categoria
const registrarCategoria = async (req, res = response) => {

    const {
        txtNombre
    } = req.body;

    const data = {
        nombre: txtNombre,
        usuario: req.usuario.id
    }

    try {
        const categoria = Categoria.build(data);
        await categoria.save();

        return respuesta(res, 200, 'success', 'Se ha registrado la información correctamente', categoria);

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//actualiza información en el servidor
const actualizarCategoria = async (req, res = response) => {

    const {
        txtNombre,
        idCategoria
    } = req.body;

    try {

        const data = {
            id: idCategoria,
            nombre: txtNombre
        }

        const categoria = await Categoria.findByPk(idCategoria);

        if (!categoria) {
            return respuesta(res, 400, 'info', 'No existe la categoria con el id: ' + idCategoria);
        }

        await categoria.update(data);

        return respuesta(res, 200, 'success', 'Se ha actualizado la información correctamente', categoria);

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//elimina información del servidor
const desactivarReactivarCategoria = async (req, res = response) => {

    const {
        idCategoria,
        estatus,
    } = req.body;

    try {

        const categoria = await Categoria.findByPk(idCategoria);

        if (!categoria) {
            return respuesta(res, 400, 'error', 'No existe la categoria con el id: ' + idCategoria);
        }

        await categoria.update({
            estatus
        });

        //borra de manera física el registro
        // await usuario.destroy();

        if (estatus == 1) {
            return respuesta(res, 200, 'success', `Se ha reactivado la categoria ${categoria.nombre} correctamente`, categoria);
        } else {
            return respuesta(res, 200, 'success', `Se ha desactivado la categoria ${categoria.nombre} correctamente`, categoria);
        }

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//trae info del servidor
const consultarCategorias = async (req, res = response) => {
    try {
        const categorias = await dbConnection.query(
            'SELECT * FROM categorias ', {
                // replacements: {
                //     estatus: 1
                // },
                type: QueryTypes.SELECT
            }
        );

        // const categorias = await Usuario.findAll();

        if (!categorias || categorias.length === 0) {
            return respuesta(res, 200, 'info', 'La tabla no tiene categorias registradas', null);
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', categorias);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }

};

//consulta una categoria por id
const consultarCategoria = async (req, res = response) => {
    //params es para params que se pasan por url
    const {
        id
    } = req.params;

    //body es para params que se paasan por el body
    // const {
    //     id
    // } = req.body;

    try {
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return respuesta(res, 400, 'info', `No existe la categoria con el id: ${id}`);
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', categoria);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registrarCategoria,
    actualizarCategoria,
    desactivarReactivarCategoria,
    consultarCategorias,
    consultarCategoria
};