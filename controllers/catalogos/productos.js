const {mensaje, response} = require('../../helpers');
const {Producto} = require('../../models');

//Función que crea el producto
const crearProducto = async (req, res = response) => {
    const {nombre, descripcion, precio, categoria} = req.body;

    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return mensaje(res, 400, `El nombre del producto '${nombre}' ya está registrado`);
    }

    const data = {
        nombre,
        descripcion,
        precio,
        categoria,
        usuario: req.usuario._id
    };

    const producto = new Producto(data);

    await producto.save();

    return mensaje(res, 201, producto);
};

//actualizar producto
const actualizarProducto = async (req, res = response) => {
    const {idProducto} = req.params;

    const {nombre, descripcion, precio, categoria} = req.body;

    const data = {
        idProducto,
        nombre,
        descripcion,
        precio,
        categoria
    };

    const producto = await Producto.findByIdAndUpdate(idProducto, data, {new: true}); //LO ENCUENTRA Y ACTUALIZA

    return mensaje(res, 200, producto);
};

//eliminar producto
const eliminarProducto = async (req, res = response) => {
    const {id} = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate(id, {
        estatus: 'Inactivo'
    }, {new: true});

    return mensaje(res, 200, productoEliminado);
};

//obtener productos
const consultarProductosActivos = async (req, res = response) => {
    const {
        limite = 10, desde = 1
    } = req.query; //valores que mando en la url para saber desde y el límite de registros que quiero

    const query = {
        estatus: 'Activo'
    };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query), //hace un conteo de los registros de la tabla
        Producto.find(query) //find trae los registros de la tabla si no hay limit ni skip traerá toooodos
        // .populate('usuario', ['nombre', 'correo'])//extrae de usuario el nombre y el correo, si no se pone se va mostrar todo el registro
        .skip(Number(desde - 1)) //skip sirve para saltar
        .limit(Number(limite)) //limit es para limitar con un número
    ]);

    return mensaje(res, 200, {total, productos});
};

//obtener producto
const consultarProducto = async (req, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id).populate('categoria', 'nombre').populate('usuario',['nombre', 'correo']);

    if (!producto) {
        return mensaje(res, 400, `No se ha encontrado el producto con el id ${id}, tal vez está inactivo o no existe`);
    }

    return mensaje(res, 200, producto);
};

module.exports = {
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    consultarProductosActivos,
    consultarProducto,
}