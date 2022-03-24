const {
    esAdminRol,
    validarCampos,
    validarJWT,
} = require('../../middlewares');

const {check, Router, existeColoniaPorId} = require('../../helpers');

const {
    crearColonia,
    actualizarColonia,
    eliminarColonia,
    consultarColoniasActivas,
    consultarColonia
} = require('../../controllers/catalogos/colonias');

const router = Router();

//registra una colonia
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo_postal', 'El código postal es obligatorio').not().isEmpty(),
    check('codigo_postal', 'el código postal debe ser solo números').isNumeric(),
    check('codigo_postal', 'el código postal debe tener 5 dígitos').isLength({
        min: 5, max: 5
    }),
    validarCampos
], crearColonia);

//actualiza la colonia
router.put('/:idColonia', [
    validarJWT,
    check('idColonia', 'No es un id válido').isMongoId(),
    check('idColonia').custom(existeColoniaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo_postal', 'El código postal es obligatorio').not().isEmpty(),
    check('codigo_postal', 'el código postal debe ser solo números').isNumeric(),
    check('codigo_postal', 'el código postal debe tener 5 dígitos').isLength({
        min: 5, max: 5
    }),
    validarCampos
], actualizarColonia);

//elimina la colonia cambiando ele status
router.delete('/:idColonia', [
    validarJWT,
    esAdminRol,
    check('idColonia', 'No es un id válido').isMongoId(),
    check('idColonia').custom(existeColoniaPorId),
    validarCampos
], eliminarColonia);

//consulta las colonias activas
router.get('/', consultarColoniasActivas);

//consulta una colonia por su id
router.get('/:idColonia', [
    check('idColonia', 'No es un id válido').isMongoId(),
    check('idColonia').custom(existeColoniaPorId),
    validarCampos
], consultarColonia);

//Se exporta la variable router que es una instancia de Router
module.exports = router;