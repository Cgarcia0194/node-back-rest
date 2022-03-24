const {mensaje, response} = require('../helpers');

/**
 * Función que sirve para validar el usuario que desea eliminar tiene el rol de administrador
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const esAdminRol = (req, res = response, next) => {
    if(!req.usuario){//quiere decir que si existe el usuario
        return mensaje(res, 500, 'Se quiere validar el rol sin validar el token primero');
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
       return mensaje(res, 401, `El usuario (${nombre}) tiene un rol ${rol}`);
    }

    next();
};

/**
 * Función que sirve para poder buscar que el rol del usuario concuerde con alguno de los que se pasan en la función
 * @param  {...any} roles : se pasa el arreglo de roles desde la ruta con los roles existentes y se desestructura
 * @returns 
 */
const tieneRol = (...roles) => {
    return (req, res = response, next) => {

        if(!req.usuario){//quiere decir que si existe el usuario
            return mensaje(res, 500, 'Se quiere validar el rol sin validar el token primero');
        }

        if(!roles.includes(req.usuario.rol)) {//función include que sirve para poder hacer una búsqueda en el arreglo
            return mensaje(res, 401, `El servicio requiere uno de estos roles ${roles}`);
        }
        
        next();//hace que continúe la siguiente middleware
    };

};

module.exports = {
    esAdminRol,
    tieneRol
};