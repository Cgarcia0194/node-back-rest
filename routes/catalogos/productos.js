const {
    validarCampos,
    validarJWT,
} = require('../../middlewares');

const {
    check,
    Router
} = require('../../helpers');

const {
    registrarProducto,
    actualizarProducto,
    desactivarReactivarProducto,
    consultarProductos,
    consultarCategorias,
    consultarProducto
} = require('../../controllers/catalogos/productos');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE PRODUCTOS
 */

router.post('/', [
    validarJWT,
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 4 digitos').isLength({
        min: 4
    }),
    check('txtDescripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('txtPrecio', 'El precio es obligatorio').not().isEmpty(),
    check('txtPrecio', 'El precio debe ser número').isNumeric(),
    check('txtCantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('txtCantidad', 'La cantidad debe ser número').isNumeric(),
    check('idCategoria', 'El id es obligatorio').not().isEmpty(),
    check('idCategoria', 'No es un id válido').isInt(),
    validarCampos
], registrarProducto);

//Sirve para actualizar datos
router.put('/', [
    check('idProducto', 'El id es obligatorio').not().isEmpty(),
    check('idProducto', 'No es un id válido').isInt(),
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 4 digitos').isLength({
        min: 4
    }),
    check('txtDescripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('txtPrecio', 'El precio es obligatorio').not().isEmpty(),
    check('txtPrecio', 'El precio debe ser número').isNumeric(),
    check('txtCantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('txtCantidad', 'La cantidad debe ser número').isNumeric(),
    check('idCategoria', 'El id es obligatorio').not().isEmpty(),
    check('idCategoria', 'No es un id válido').isInt(),
    validarCampos
], actualizarProducto);

//Sirve para eliminar registro
router.delete('/', [
    validarJWT,
    // esAdminRol,
    check('idProducto', 'El id es obligatorio').not().isEmpty(),
    check('idProducto', 'No es un id válido').isInt(),
    // check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], desactivarReactivarProducto);

router.post('/productos', [validarJWT], consultarProductos);

router.get('/categorias', [validarJWT], consultarCategorias);

//consulta la categoria con id por url
router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isInt(),
], consultarProducto);

module.exports = router;