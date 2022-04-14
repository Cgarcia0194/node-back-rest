const {
    Usuario
} = require('../../models');

const {
    respuesta,
    response,
    encriptarTexto
} = require('../../helpers');

const {
    dbConnection
} = require("../../DB/config");

const {
    QueryTypes
} = require("sequelize");

const registrarUsuario = async (req, res = response) => {

    const {
        txtNombre,
        txtCorreo,
        google,
        txtContrasenia,
        idPersona
    } = req.body;

    const contraseniaEncrip = encriptarTexto(txtContrasenia);

    const data = {
        nombre: txtNombre,
        correo: txtCorreo,
        google,
        contrasenia: contraseniaEncrip,
        persona: idPersona
    }

    try {
        const usuario = Usuario.build(data);
        await usuario.save();

        return respuesta(res, 200, 'success', 'Se ha registrado el usuario correctamente', usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

const actualizarUsuario = async (req, res = response) => {
    const {
        txtNombre,
        txtCorreo,
        txtContrasenia,
        idUsuario
    } = req.body;

    const contraseniaEncrip = encriptarTexto(txtContrasenia);

    try {
        // const [, uno] = await dbConnection.query(
        //     'UPDATE usuarios SET nombre = :nombre, contrasenia = :contrasenia WHERE id = :id ', {
        //         replacements: {
        //             id: idUsuario,
        //             nombre: txtNombre,
        //             contrasenia: contraseniaEncrip
        //         },
        //         type: QueryTypes.UPDATE
        //     }
        // );

        const data = {
            id: idUsuario,
            correo: txtCorreo,
            nombre: txtNombre,
            contrasenia: contraseniaEncrip,
        }

        const usuario = await Usuario.findByPk(idUsuario);

        if (!usuario) {
            return respuesta(res, 400, 'info', 'No existe el usuario con el id: ' + idUsuario);
        }

        await usuario.update(data);

        return respuesta(res, 200, 'success', 'Se ha actualizado la info de manera correcta', usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');

    }
};

const eliminarUsuario = async (req, res = response) => {

    const {
        idUsuario
    } = req.body;

    try {

        const usuario = await Usuario.findByPk(idUsuario);

        if (!usuario) {
            return respuesta(res, 400, 'info', 'No existe el usuario con el id: ' + idUsuario);
        }

        //borra de manera física el registro
        // await usuario.destroy();

        await usuario.update({
            estatus: 2
        });

        return respuesta(res, 200, 'success', `Se ha desactivado el usuario ${usuario.nombre} correctamente`, usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

const consultarUsuarios = async (req, res = response) => {

    const usuarios = await dbConnection.query(
        'SELECT * FROM usuarios WHERE estatus + 0 = :estatus ', {
            replacements: {
                estatus: 1
            },
            type: QueryTypes.SELECT
        }
    );

    // const usuarios = await Usuario.findAll();

    if (!usuarios || usuarios.length === 0) {
        return respuesta(res, 200, 'info', 'La tabla no tiene usuarios registrados');
    }

    return respuesta(res, 200, 'success', 'Información consultada correctamente', usuarios);
};

const consultarUsuario = async (req, res = response) => {
    const {
        id
    } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return respuesta(res, 400, 'info', `No existe el usuario con el id: ${id}`);
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

module.exports = {
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    consultarUsuarios,
    consultarUsuario
};