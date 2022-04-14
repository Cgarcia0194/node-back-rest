const {
    Producto,
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

//Función que inserta el producto
const registrarProducto = async (req, res = response) => {

    const {
        txtNombre,
        txtDescripcion,
        txtPrecio,
        txtCantidad,
        idCategoria
    } = req.body;

    const data = {
        nombre: txtNombre,
        descripcion: txtDescripcion,
        precio: txtPrecio,
        cantidad: txtCantidad,
        categoria: idCategoria,
        usuario: req.usuario.id
    }

    const categoria = await Categoria.findByPk(idCategoria);

    if (!categoria) {
        return respuesta(res, 400, 'info', 'No existe la categoria con el id: ' + idCategoria, null);
    }

    try {
        const producto = Producto.build(data);
        await producto.save();

        return respuesta(res, 200, 'success', 'Se ha registrado el producto correctamente', producto);

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//actualiza información en el servidor
const actualizarProducto = async (req, res = response) => {

    const {
        idProducto,
        txtNombre,
        txtDescripcion,
        txtPrecio,
        txtCantidad,
        idCategoria
    } = req.body;

    try {

        const data = {
            id: idProducto,
            nombre: txtNombre,
            descripcion: txtDescripcion,
            precio: txtPrecio,
            cantidad: txtCantidad,
            categoria: idCategoria
        }

        const producto = await Producto.findByPk(idProducto);

        if (!producto) {
            return respuesta(res, 400, 'info', 'No existe el producto con el id: ' + idProducto);
        }

        const categoria = await Categoria.findByPk(idCategoria);

        if (!categoria) {
            return respuesta(res, 400, 'info', 'No existe la categoria con el id: ' + idCategoria);
        }

        await producto.update(data);

        return respuesta(res, 200, 'success', 'Se ha actualizado la info de manera correcta', producto);

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//elimina información del servidor
const desactivarReactivarProducto = async (req, res = response) => {

    const {
        idProducto,
        estatus
    } = req.body;

    try {

        const producto = await Producto.findByPk(idProducto);

        if (!producto) {
            return respuesta(res, 400, 'info', 'No existe la categoria con el id: ' + idProducto);
        }

        await producto.update({
            estatus
        });

        if (estatus == 1) {
            return respuesta(res, 200, 'success', `Se ha reactivado el producto ${producto.nombre} correctamente`, producto);
        } else {
            return respuesta(res, 200, 'success', `Se ha desactivado el producto ${producto.nombre} correctamente`, producto);
        }

    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//trae info del servidor
const consultarProductos = async (req, res = response) => {

    try {
        const {
            idCategoria
        } = req.body;

        const productos = await dbConnection.query(
            'SELECT productos.*, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON categorias.id = productos.categoria WHERE productos.categoria = :idCategoria ', {
                replacements: {
                    idCategoria
                },
                type: QueryTypes.SELECT
            }
        );

        if (!productos || productos.length === 0) {
            return respuesta(res, 200, 'info', 'No hay información', null);
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', productos);
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
            return respuesta(res, 200, 'info', 'La tabla no tiene categorias registradas');
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', categorias);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

//consulta un producto por id
const consultarProducto = async (req, res = response) => {
    const {
        id
    } = req.params;

    try {

        let producto = await Producto.findByPk(id);

        if (!producto) {
            return respuesta(res, 400, 'info', `No existe el producto con el id: ${id}`);
        }

        producto = await dbConnection.query(
            'SELECT productos.*, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON categorias.id = productos.categoria WHERE productos.id = :id ', {
                //'SELECT productos.*, categorias.nombre AS categoria_nombre FROM productos INNER JOIN categorias ON categorias.id = productos.categoria WHERE productos.id = :id AND productos.estatus + 0 = :estatus ', {
                replacements: {
                    id
                },
                type: QueryTypes.SELECT
            }
        );

        return respuesta(res, 200, 'success', 'Información consultada correctamente', producto);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registrarProducto,
    actualizarProducto,
    desactivarReactivarProducto,
    consultarProductos,
    consultarCategorias,
    consultarProducto
};