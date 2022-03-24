const jwt = require('jsonwebtoken'); //se importa la librería jsonwebtoken que sirve para generar los json web tokens

const {mensaje, request, response} = require('../helpers');
const {
    Usuarios
} = require('../models');

/**
 * Función que sirve para validar el Json Web Token que manda el usuario del front al backend
 * @param {*} req 
 * @param {*} res 
 * @param {*} next : sirve para poder decir que siga a la siguiente middleware cuando todo está bien en esta
 * @returns 
 */
const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return mensaje(res, 401, 'No hay un token en la petición solicitada');
    }

    try {
        //token: el que manda el usuario front end
        //process.env.SECRETORPRIVATEKEY: es el que está en el backend en el archivo .env
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //sirve para verificar el json web token

        //traigo la información del usuario que está logueado en el sistema y quiere eliminar a otro usuario
        const usuario = await Usuarios.findById({_id: uid});

        if (usuario) { //verifica que exista información del usuario que está logueado en el sistema
            if (usuario.estado === false) { //si existe, pero está en false es como si estuviera eliminado
                return mensaje(res, 401, 'El usuario que está en el sistema está eliminado');
            }
        } else { //si no existe el registro en la base de datos
            return mensaje(res, 401, 'El usuario no existe');
        }

        //asigno el _id por uid para poder trabajar los tokens
        req.usuario = usuario;
        next(); //debe aplicarse este next para que conitnúe a evaluar e siguiente middleware

    } catch (error) {
        console.log('Mirar el error',error);
        return mensaje(res, 401, 'Token no válido');
    }
};

module.exports = {
    validarJWT
}