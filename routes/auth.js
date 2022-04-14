const {login, googleSignIn} = require('../controllers/auth');
const {Router,check} = require('../helpers');
const {validarCampos} = require('../middlewares');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE AUTH
 */
router.post('/login', [
    check('txtCorreo', 'El correo es obligatorio').not().isEmpty(),
    check('txtCorreo', 'El correo no tiene el formato correcto').isEmail(),
    check('txtContrasenia', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

//Se exporta la variable router que es una instancia de Router
module.exports = router;