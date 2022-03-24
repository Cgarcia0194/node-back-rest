//middleware que sirve para validar que se esté adjuntando un archivo cuando se quiere subir alguno
const validarArchivo = require('../middlewares/validar-archivo');
//middleware que sirve para validar los campos
const validarCampos = require('../middlewares/validarCampos');
//middleware que sirve para validar el JsonWebToken
const validarJWT = require('../middlewares/validar-jwt');
//middleware que sirve para validar los roles
const validarRoles = require('../middlewares/validar-roles');

//se exportan las rutas de manera desestructurada para que se pueda usar cada método que se deseé y no de manera estática
module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
};