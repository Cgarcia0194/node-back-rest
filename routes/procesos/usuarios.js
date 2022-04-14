const {
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    consultarUsuarios,
    consultarUsuario
} = require('../../controllers/procesos/usuarios');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../../middlewares');

const {
    check,
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    Router
} = require('../../helpers');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE USUARIOS
 */

/**
 * 1. Ruta
 * 2. Se pasa un arreglo de los campos que se quieren validar con express-validator y como se quiere validar cada uno
 * (estos son middlewares de check y el otro es un personalizado)
 * 3. Controlador de usuarios
 */
router.post('/', [
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo no tiene el formato correcto').isEmail(),
    check('txtContrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    check('txtContrasenia', 'La contraseña debe tener más de 6 digitos').isLength({
        min: 6
    }),
    check('idPersona', 'El id es obligatorio').not().isEmpty(),
    check('idPersona', 'El id de la persona no tiene el formato correcto').isInt(),
    validarCampos
], registrarUsuario);

// //Sirve para actualizar datos
router.put('/', [
    validarJWT,
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo no tiene el formato correcto').isEmail(),
    check('txtContrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    check('txtContrasenia', 'La contraseña debe tener más de 6 digitos').isLength({
        min: 6
    }),
    check('idUsuario', 'El id es obligatorio').not().isEmpty(),
    check('idUsuario', 'No es un id válido').isInt(),
    // check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], actualizarUsuario);

router.delete('/', [
    // validarJWT,
    // esAdminRol,
    check('idUsuario', 'El id es obligatorio').not().isEmpty(),
    check('idUsuario', 'No es un id válido').isInt(),
    // check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], eliminarUsuario);

router.get('/', consultarUsuarios);

router.get('/:id', consultarUsuario);

module.exports = router;