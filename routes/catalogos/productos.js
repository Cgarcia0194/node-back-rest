const {
    validarCampos,
    validarJWT,
    esAdminRol
} = require('../../middlewares');

const {
    check,
    existeCategoriaPorId,
    existeProductoPorId,
    Router
} = require('../../helpers');

const {
    consultarProductosActivos,
    consultarProducto,
    actualizarProducto,
    eliminarProducto,
    crearProducto
} = require('../../controllers/catalogos/productos');

const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('categoria', 'Debes proporcionar el id de la categoria').not().isEmpty(),
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:idProducto', [
    validarJWT,
    check('idProducto', 'El id del producto no es válido').isMongoId(),
    check('idProducto').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('precio', 'El precio debe ser número').isNumeric(),
    check('categoria', 'Debes proporcionar el id de la categoria').not().isEmpty(),
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id del producto no es válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProducto);

router.get('/', consultarProductosActivos);

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], consultarProducto);

module.exports = router;