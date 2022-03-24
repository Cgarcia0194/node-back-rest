const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../../controllers/procesos/usuarios');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../../middlewares');

const {check,esRolValido,existeEmail,existeUsuarioPorId,Router} = require('../../helpers');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE USUARIOS
 */
router.get('/', usuariosGet);

/**
 * 1. Ruta
 * 2. Se pasa un arreglo de los campos que se quieren validar con express-validator y como se quiere validar cada uno
 * (estos son middlewares de check y el otro es un personalizado)
 * 3. Controlador de usuarios
 */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña debe tener más de 6 digitos').isLength({
        min: 6
    }),
    check('correo', 'El correo ingresado no tiene el formato de correo').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom(rol => esRolValido(rol)),//Es una función callback y se envía el parametro de manera automática
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

//Sirve para actualizar datos
router.put('/:idUsuario', [
    check('idUsuario', 'No es un id válido').isMongoId(),
    check('idUsuario').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

//
router.patch('/', usuariosPatch);

//Sirve para eliminar registro
router.delete('/:idUsuario', [
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('idUsuario', 'No es un id válido').isMongoId(),
    check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

//Se exporta la variable router que es una instancia de Router
module.exports = router;