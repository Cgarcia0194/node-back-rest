const {
    validarCampos,
    validarJWT,
    esAdminRol
} = require('../../middlewares');

const {
    check,
    Router,
    existePersonaPorId
} = require('../../helpers');

const {
    crearMovimiento
} = require('../../controllers/gastos/movimientos');

const router = Router();

router.post('/', [
    validarJWT,
    check('txtConcepto', 'El concepto es obligatorio').not().isEmpty(),
    check('txtConcepto', 'El nombre debe tener más de 6 digitos').isLength({
        min: 6
    }),
    check('txtTotal', 'El total es obligatorio').not().isEmpty(),
    check('txtTotal', 'El total debe ser números').isNumeric(),
    check('txtFechaMovimiento', 'La fecha de movimiento es obligatoria').not().isEmpty(),
    check('txtFechaMovimiento', 'La fecha de movimiento no tiene el formato YYYY-MM-DD (año-mes-dia)').isDate(),
    check('txtCantidadMeses', 'La cantidad de meses es obligatoria').not().isEmpty(),
    check('txtCantidadMeses', 'El cantidad de meses debe ser números').isInt(),
    // check('txtFechaLiquidacion', 'La fecha de liquidación no tiene el formato YYYY-MM-DD (año-mes-dia)').isDate(),
    // check('txtCantidadLiquidacion', 'La cantidad de liquidación debe ser números').isNumeric(),
    check('txtObservacion', 'La observación es obligatoria').not().isEmpty(),
    check('idPersona', 'No es un id válido').isMongoId(),
    check('idPersona').custom(existePersonaPorId),
    validarCampos
], crearMovimiento);

module.exports = router;