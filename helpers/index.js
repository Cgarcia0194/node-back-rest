//archivo que sirve para validar de la base de datos
const dbValidators = require('../helpers/db-validators');
//archivo que sirve para validar el campos (diversos)
const fieldValidators = require('../helpers/field-validators');
//archivo que sirve para generar los jsonWebToken
const generarJWT = require('../helpers/generar-jwt');
//archivo que sirve para verificar mediante google
const googleVerify = require('../helpers/google-verify');
//archivo que sirve para generar los mensajes de error o según los valores que se manden
const mensajes = require('../helpers/mensajes');
//archivo que contiene los requires o importaciones de otras librerías
const requires = require('../helpers/requires');
//archivo que sirve para subir archivos
const subirArchivo = require('../helpers/subir-archivo');

//se exportan las rutas de manera desestructurada para que se pueda usar cada método que se deseé y no de manera estática
module.exports = {
    ...dbValidators,
    ...fieldValidators,
    ...generarJWT,
    ...googleVerify,
    ...mensajes,
    ...requires,
    ...subirArchivo
};