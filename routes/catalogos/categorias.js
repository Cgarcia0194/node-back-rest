const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../../middlewares');

const {
    check,
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    Router
} = require('../../helpers');

const {
    registrarCategoria,
    actualizarCategoria,
    desactivarReactivarCategoria,
    consultarCategorias,
    consultarCategoria
} = require('../../controllers/catalogos/categorias');

//se llama la función Router en router, a este se le configuran las rutas
const router = Router();

/**
 * RUTAS DE CATEGORIAS
 */

router.post('/', [
    validarJWT,
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 4 digitos').isLength({
        min: 4
    }),
    validarCampos
], registrarCategoria);

//Sirve para actualizar datos
router.put('/', [
    check('idCategoria', 'El id es obligatorio').not().isEmpty(),
    check('idCategoria', 'No es un id válido').isInt(),
    check('txtNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('txtNombre', 'El nombre debe tener más de 4 digitos').isLength({
        min: 4
    }),
    validarCampos
], actualizarCategoria);

//Sirve para eliminar registro
router.delete('/', [
    validarJWT,
    // esAdminRol,
    check('idCategoria', 'El id es obligatorio').not().isEmpty(),
    check('idCategoria', 'No es un id válido').isInt(),
    // check('idUsuario').custom(existeUsuarioPorId),
    validarCampos
], desactivarReactivarCategoria);

router.get('/', [validarJWT], consultarCategorias);

//consulta la categoria con id por url
router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isInt(),
], consultarCategoria);

module.exports = router;