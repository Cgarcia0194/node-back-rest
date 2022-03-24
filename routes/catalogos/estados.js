const {
    esAdminRol,
    validarCampos,
    validarJWT
} = require("../../middlewares");

const {
    check,
    existeEstadoPorId,
    existePaisPorId,
    Router,
} = require("../../helpers");

const {
    crearEstado,
    actualizarEstado,
    eliminarEstado,
    consultarEstadosActivos,
    consultarEstado
} = require("../../controllers/catalogos/estados");

const router = Router();

//registra un estado
router.post("/", [
    validarJWT,
    check("idPais", "El id del pais es obligatorio").not().isEmpty(),
    check('idPais', 'No es un id válido').isMongoId(),
    check('idPais').custom(existePaisPorId),
    check("txtNombre", "El nombre es obligatorio").not().isEmpty(),
    check("txtClave", "La clave es obligatoria").not().isEmpty(),
    check("txtClave", "La clave debe ser sólo números").isNumeric(),
    check('txtClave', 'La abreviatura solo debe tener 2 dígitos').isLength({
        min: 2,
        max: 2
    }),
    check("txtAbreviatura", "La abreviatura es obligatoria").not().isEmpty(),
    validarCampos,
], crearEstado);

//actualiza el estado
router.put('/:idEstado', [
    validarJWT,
    check('idEstado', 'No es un id válido').isMongoId(),
    check('idEstado').custom(existeEstadoPorId),
    check("txtNombre", "El nombre es obligatorio").not().isEmpty(),
    check("txtClave", "La clave es obligatoria").not().isEmpty(),
    check("txtClave", "La clave debe ser sólo números").isNumeric(),
    check('txtClave', 'La clave solo debe tener 2 dígitos').isLength({
        min: 2,
        max: 2
    }),
    check("txtAbreviatura", "La abreviatura es obligatoria").not().isEmpty(),
    check("idPais", "El id del pais es obligatorio").not().isEmpty(),
    check('idPais', 'No es un id válido').isMongoId(),
    check('idPais').custom(existePaisPorId),
    validarCampos
], actualizarEstado);

//elimina el pais cambiando el status
router.delete('/:idEstado', [
    validarJWT,
    esAdminRol,
    check('idEstado', 'No es un id válido').isMongoId(),
    check('idEstado').custom(existeEstadoPorId),
    validarCampos
], eliminarEstado);

// consulta las estados activos
router.get('/', consultarEstadosActivos);

//consulta un estado por su id
router.get('/:idEstado', [
    check('idEstado', 'No es un id válido').isMongoId(),
    check('idEstado').custom(existeEstadoPorId),
    validarCampos
], consultarEstado);

module.exports = router;