const {mensaje, response} = require('../../helpers');
const {Categoria} = require('../../models');

//Función que crea la categoria
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({
        nombre
    });

    if (categoriaDB) {
        return mensaje(res, 400, `El nombre de la categoria '${nombre}' ya está registrado`);
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);

    await categoria.save();

    return mensaje(res, 200, categoria);
};

//actualizar categoria
const actualizarCategoria = async (req, res = response) => {
    const {idCategoria} = req.params;

    const nombre = req.body.nombre.toUpperCase();

    const data = {
        idCategoria,
        nombre
    };

    const categoria = await Categoria.findByIdAndUpdate(idCategoria, data, {new: true}); //LO ENCUENTRA Y ACTUALIZA

    return mensaje(res, 200, categoria);
};

//eliminar categoria
const eliminarCategoria = async (req, res = response) => {
    const {id} = req.params;

    //Elimina la categoria de manera física
    //const categoria = await Categoria.findByIdAndDelete(id);
    const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {
        estatus: 'Inactivo'
    }, {new: true});

    return mensaje(res, 200, categoriaEliminada);
};

//obtener categorias - paginado - total- populate
const consultarCategoriasActivas = async (req, res = response) => {
    const {
        limite = 10, desde = 1
    } = req.query; //valores que mando en la url para saber desde y el límite de registros que quiero

    const query = {
        estatus: 'Activo'
    };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query), //hace un conteo de los registros de la tabla
        Categoria.find(query) //find trae los registros de la tabla si no hay limit ni skip traerá toooodos
        .populate('usuario', ['nombre', 'correo'])//extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
        .skip(Number(desde - 1)) //skip sirve para saltar
        .limit(Number(limite)) //limit es para limitar con un número
    ]);

    return mensaje(res, 200, {total, categorias});
};

//obtener categoria - populate
const consultarCategoria = async (req, res = response) => {
    const {
        id
    } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', ['nombre, correo']);

    if (!categoria) {
        return mensaje(res, 400, `No se ha encontrado la categoria con el id ${id}, tal vez está inactivo o no existe`);
    }

    return mensaje(res, 200, {categoria});
};

module.exports = {
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    consultarCategoriasActivas,
    consultarCategoria
}