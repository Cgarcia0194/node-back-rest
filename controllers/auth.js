const {
    generarJWT,
    googleVerify,
    respuesta,
    compararTextoEncriptado,
    response,
} = require('../helpers');

const {
    Usuario
} = require('../models');

const {
    dbConnection
} = require("../DB/config");

const {
    QueryTypes
} = require("sequelize");

/**
 * Función que sirve para poder loguear o hacer que un usuario ingrese al sistema
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res = response) => {

    const {
        txtCorreo,
        txtContrasenia
    } = req.body;

    try {
        let user = await dbConnection.query(
            'SELECT usuarios.*, CONCAT(personas.nombre," ",personas.apellido_paterno," ", personas.apellido_materno) AS nombre_completo FROM usuarios INNER JOIN personas ON personas.id = usuarios.id WHERE correo = :correo', {
                replacements: {
                    correo: txtCorreo
                },
                type: QueryTypes.SELECT
            }
        );

        if (!user || user.length === 0) {
            return respuesta(res, 400, 'info', 'Correo incorrecto');
        }

        const {
            id,
            nombre,
            correo,
            contrasenia,
            google,
            persona,
            estatus,
            nombre_completo,
        } = user[0];

        const usuario = {
            id,
            nombre,
            correo,
            google,
            persona,
            estatus,
            nombre_completo,
        }

        if (usuario.estatus === 'Inactivo') {
            return respuesta(res, 400, 'warning', 'El usuario está inactivo, contacte a un admin');
        }

        const contraseniaValida = compararTextoEncriptado(txtContrasenia, contrasenia);

        //si contraseniaValida es false no es correcta
        if (contraseniaValida === false) {
            return respuesta(res, 400, 'info', 'La contraseña no es correcta');
        }

        const token = await generarJWT(usuario.id);

        return respuesta(res, 200, 'success', 'Información consultada correctamente', {
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return respuesta(res, 400, 'error', 'Hable con el administrador');
    }
};

/**
 * Función que sirve para poder traer el token de Google desde el front al backend y la información del correo
 * con el que se está autenticando
 * @param {*} req 
 * @param {*} res 
 */
const googleSignIn = async (req, res = response) => {
    const {
        id_token
    } = req.body;

    try {

        const {
            nombre,
            imagen,
            correo,
            nombre_pila,
            apellido_paterno
        } = await googleVerify(id_token);

        let usuario = await dbConnection.query(
            'SELECT * FROM usuarios WHERE correo = :correo ', {
                replacements: {
                    correo
                },
                type: QueryTypes.SELECT
            }
        );

        if (!usuario || usuario.length === 0) {
            return respuesta(res, 401, 'error', 'No hay info relacionada con el correo: ' + correo);
        }

        //si el usuario en bd está inactivo false
        if (usuario.estatus === 'Inactivo') {
            return respuesta(res, 401, 'error', 'Hable con el administrador, usuario inactivo');
        }

        //genera el JWT con los datos del usuario que ya se acaba de loguear en las líneas anteriores
        const token = await generarJWT(usuario.id);

        return respuesta(res, 200, 'success', 'Información consultada correctamente', {
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return respuesta(res, 401, 'error', 'El token no se pudo verificar');
    }
};

module.exports = {
    login,
    googleSignIn
};