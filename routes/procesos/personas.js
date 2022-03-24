const {
    personasGet,
    personasPost
} = require('../../controllers/procesos/personas');

const {
    validarCampos
} = require('../../middlewares');

const {check, Router, validarCURP, validarEstadoCivil} = require('../../helpers');

const router = Router();

/**
 * RUTAS DE PERSONAS
 */
 router.get('/', personasGet);

router.post('/', [
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 6 digitos').isLength({
        min: 3
    }),
    check('txApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('txApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    // check('txtRfc', 'El formato del RFC no es válido').custom(validarCURP),
    check('txtCurp', 'La CURP es obligatoria').not().isEmpty(),
    check('txtCurp', 'El formato de la CURP no es válido').custom(validarCURP),
    check('txtGenero', 'El género es obligatorio').not().isEmpty(),
    check('txtTelefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('txtFechaNac', 'La fecha de nacimiento no tiene el formato YYYY/MM/DD o YYYY-MM-DD').isDate(),
    check('txtEdad', 'La edad es obligatoria').not().isEmpty(),
    check('txtEdad', 'La edad no es número').isInt(),
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo ingresado no tiene el formato de correo').isEmail(),
    check('txtContrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    check('txtContrasenia', 'La contraseña debe tener más de 6 digitos').isLength({
        min: 6
    }),
    check('txtEstadocivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('txtEstadocivil', 'El estado civil no existe').custom(validarEstadoCivil),
    check('txtNacionalidad', 'La nacionalidad es obligatoria').not().isEmpty(),
    validarCampos
], personasPost);

//Se exporta la variable router que es una instancia de Router
module.exports = router;