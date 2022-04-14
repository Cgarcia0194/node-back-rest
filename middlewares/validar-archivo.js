const {
    respuesta,
    response
} = require('../helpers');

/**
 * Función que sirve para validar que se esté subiendo un archivo o se haya adjuntado
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarArchivoSubir = async (req, res = response, next) => {
    //verifica que en la req venga el files y por tamaño
    if (!req.files || Object.keys(req.files).length === 0) {
        return respuesta(res, 400, 'info', 'No se adjuntó ningún archivo');
    }

    next();
};

module.exports = {
    validarArchivoSubir
}