const {
    registrarPersona,
    actualizarPersona,
    actualizarUsuario,
    eliminarPersona,
    consultarPersonas,
    consultarPersona,
    consultarNacionalidades,
    consultarPaises,
    consultarEstados,
    consultarMunicipios
} = require('../../controllers/procesos/personas');

const {
    validarCampos,
    validarJWT,
} = require('../../middlewares');

const {
    check,
    Router,
    validarCURP,
    validarEstadoCivil
} = require('../../helpers');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE PERSONAS
 */

/**
 * 1. Ruta
 * 2. Se pasa un arreglo de los campos que se quieren validar con express-validator y como se quiere validar cada uno
 * (estos son middlewares de check y el otro es un personalizado)
 * 3. Controlador de usuarios
 */

router.post('/', [
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('txtApellidoPaterno', 'El apellido paterno debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('txtApellidoMaterno', 'El apellido materno debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtRFC', 'El RFC es obligatorio').not().isEmpty(),
    check('txtCURP', 'La CURP es obligatoria').not().isEmpty(),
    check('txtCURP', 'La CURP no tiene el formato correcto').custom(validarCURP),
    check('cmbGenero', 'El género es obligatorio').not().isEmpty(), //crear middleware que valida el género
    check('txtTel', 'el teléfono es obligatorio').not().isEmpty(),
    check('txtTelFijo', 'el teléfono fijo es obligatorio').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento debe tener el formato YYYY-MM-DD').isDate(),
    check('txtEdad', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('txtEdad', 'La fecha de nacimiento debe ser un número entero').isInt(),
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo debe ser un correo').isEmail(),
    check('cmbEstadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('cmbEstadoCivil', 'El id del estado civil no existe').custom(validarEstadoCivil),
    check('cmbNacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('cmbNacionalidad', 'La nacionalidad debe ser un número entero').isInt(),
    check('cmbMunicipio', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('cmbMunicipio', 'La nacionalidad debe ser un número entero').isInt(),
    validarCampos
], registrarPersona);

// //Sirve para actualizar datos
router.put('/', [
    validarJWT,
    check('idPersona', 'El id es obligatorio').not().isEmpty(),
    check('idPersona', 'No es un id válido').isInt(),
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('txtApellidoPaterno', 'El apellido paterno debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('txtApellidoMaterno', 'El apellido materno debe tener más de 3 digitos').isLength({
        min: 3
    }),
    check('txtRFC', 'El RFC es obligatorio').not().isEmpty(),
    check('txtCURP', 'La CURP es obligatoria').not().isEmpty(),
    check('txtCURP', 'La CURP no tiene el formato correcto').custom(validarCURP),
    check('cmbGenero', 'El género es obligatorio').not().isEmpty(), //crear middleware que valida el género
    check('txtTel', 'el teléfono es obligatorio').not().isEmpty(),
    check('txtTelFijo', 'el teléfono fijo es obligatorio').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento debe tener el formato YYYY-MM-DD').isDate(),
    check('txtEdad', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('txtEdad', 'La fecha de nacimiento debe ser un número entero').isInt(),
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo debe ser un correo').isEmail(),
    check('cmbEstadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('cmbEstadoCivil', 'El id del estado civil no existe').custom(validarEstadoCivil),
    check('cmbNacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('cmbNacionalidad', 'La nacionalidad debe ser un número entero').isInt(),
    check('cmbMunicipio', 'La nacionalidad es obligatoria').not().isEmpty(),
    check('cmbMunicipio', 'La nacionalidad debe ser un número entero').isInt(),
    validarCampos
], actualizarPersona);

router.put('/usuario', [
    validarJWT,
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo debe ser un correo').isEmail(),
    check('txtContraseniaActual', 'El correo es obligatorio').not().isEmpty(),
    check('txtContraseniaNueva', 'El correo es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/', [
    validarJWT,
    // esAdminRol,
    check('idUsuario', 'El id es obligatorio').not().isEmpty(),
    check('idUsuario', 'No es un id válido').isInt(),
    // check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], eliminarPersona);

// router.get('/', [validarJWT], consultarPersonas);

router.get('/', [validarJWT], consultarPersona);

router.get('/nacionalidades', [validarJWT], consultarNacionalidades);

router.get('/paises', [validarJWT], consultarPaises);

router.post('/estados', [validarJWT], consultarEstados);

router.post('/municipios', [validarJWT], consultarMunicipios);

module.exports = router;