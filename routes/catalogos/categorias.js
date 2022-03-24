const {
    validarCampos,
    validarJWT,
    esAdminRol
} = require('../../middlewares');

const {check, Router, existeCategoria, existeCategoriaPorId} = require('../../helpers');

const {
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    consultarCategoriasActivas,
    consultarCategoria
} = require('../../controllers/catalogos/categorias');

/**
 * para las peticiones que reciben id crear un middleware que sirve para validar que existe el id que se manda
 */

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

//PARA LAS PETICIONES POST SE USAR req.body, ya que los datos no se mandan por URL se mandan por el cuerpo del mensaje
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:idCategoria', [
    validarJWT,
    check('idCategoria', 'No es un id válido').isMongoId(),
    check('idCategoria').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria);

//PARA LAS PETICIONES GET SE USA req.query, ya que son los datos que se mandan por URL después del ?
//como nombre=carlos&apellidoP=García...
router.get('/', consultarCategoriasActivas);

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], consultarCategoria);

//Se exporta la variable router que es una instancia de Router
module.exports = router;