const {login, googleSignIn} = require('../controllers/auth');
const {Router,check} = require('../helpers');
const {validarCampos} = require('../middlewares');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE AUTH
 */
router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('contrasenia', 'la contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Token de Google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

//Se exporta la variable router que es una instancia de Router
module.exports = router;