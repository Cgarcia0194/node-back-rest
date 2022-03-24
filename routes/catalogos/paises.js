const {
    esAdminRol,
    validarCampos,
    validarJWT
} = require("../../middlewares");

const {
    check,
    existePaisPorId,
    Router,
} = require("../../helpers");

const {
    crearPais,
    actualizarPais,
    eliminarPais,
    consultarPaisesActivos,
    consultarPais
} = require("../../controllers/catalogos/paises");

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

//registra un pais
router.post("/", [
    validarJWT,
    check("txtNombre", "El nombre es obligatorio").not().isEmpty(),
    check("txtAbreviatura", "La abreviatura es obligatoria").not().isEmpty(),
    check('txtAbreviatura', 'La abreviatura solo debe tener 2 dígitos').isLength({
        min: 2,
        max: 2
    }),
    check('txtAbreviatura', 'La abreviatura solo deben ser letras').isAlpha(),
    validarCampos,
], crearPais);

//actualiza la pais
router.put('/:idPais', [
    validarJWT,
    check('idPais', 'No es un id válido').isMongoId(),
    check('idPais').custom(existePaisPorId),
    check("txtNombre", "El nombre es obligatorio").not().isEmpty(),
    check("txtAbreviatura", "La abreviatura es obligatoria").not().isEmpty(),
    check('txtAbreviatura', 'La abreviatura solo debe tener 2 dígitos').isLength({
        min: 2,
        max: 2
    }),
    check('txtAbreviatura', 'La abreviatura solo deben ser letras').isAlpha(),
    validarCampos
], actualizarPais);

//elimina el pais cambiando el status
router.delete('/:idPais', [
    validarJWT,
    esAdminRol,
    check('idPais', 'No es un id válido').isMongoId(),
    check('idPais').custom(existePaisPorId),
    validarCampos
], eliminarPais);

// consulta las paises activos
router.get('/', consultarPaisesActivos);

//consulta un pais por su id
router.get('/:idPais', [
    check('idPais', 'No es un id válido').isMongoId(),
    check('idPais').custom(existePaisPorId),
    validarCampos
], consultarPais);

module.exports = router;