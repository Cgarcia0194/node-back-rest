const bcryptjs = require('bcryptjs');

/**
 * función que sirve para comparar textos encriptados
 * @param {*} textoAEncriptar 
 * @param {*} textoEncriptado 
 * @returns 
 */
const compararTextoEncriptado = (textoAEncriptar = '', textoEncriptado = '') => {
    try {
        const textoValido = bcryptjs.compareSync(textoAEncriptar, textoEncriptado);

        return textoValido;
    } catch (error) {
        console.log(error);
    }
};

/**
 * Función que sirve para poder encriptar una cadena de texto
 * @param {*} texto 
 * @returns 
 */
const encriptarTexto = texto => {
    const salt = bcryptjs.genSaltSync(13);

    const textoEncriptado = bcryptjs.hashSync(texto, salt);

    return textoEncriptado;
};

/**
 * Función que sirve para retornar una respuesta
 * @param {*} res 
 * @param {*} estatusServer 
 * @param {*} estatus 
 * @param {*} msg 
 * @param {*} data 
 * @returns 
 */
const respuesta = (res, estatusServer = 400, estatus = '', msg = '', data = null) => res.status(estatusServer).json({
    estatus,
    msg,
    data
});

module.exports = {
    compararTextoEncriptado,
    encriptarTexto,
    respuesta
};