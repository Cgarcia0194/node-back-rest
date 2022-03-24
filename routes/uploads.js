const {
    actualizarArchivo,
    guardarArchivo,
    consultarArchivo,
} = require('../controllers/uploads');
const {
    check,
    coleccionesPermitidas,
    Router,
} = require('../helpers');
const {
    validarCampos,
    validarArchivoSubir
} = require('../middlewares');

const router = Router();

//registra un archivo
router.post('/', validarArchivoSubir, guardarArchivo);

//actualiza la imagen del usuario
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un id válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo);

//
router.get('/:coleccion/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], consultarArchivo);

//Se exporta la variable router que es una instancia de Router
module.exports = router;