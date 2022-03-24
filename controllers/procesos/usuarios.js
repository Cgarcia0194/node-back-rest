const {Usuarios} = require('../../models');
const {mensaje, bcryptjs, response} = require('../../helpers');

//trae info del servidor
const usuariosGet = async (req, res = response) => {
    // const {q,nombre = 'Sin nombre',apikey} = req.query; //es un ejemplo de parametros que se enviaron en pruebas
    const {limite = 10, desde = 1} = req.query;//valores que mando en la url para saber desde y el límite de registros que quiero

    const query = {
        estado: true
    };

    const [total, usuarios] = await Promise.all([
        Usuarios.countDocuments(query),//hace un conteo de los registros de la tabla
        Usuarios.find(query)//find trae los registros de la tabla si no hay limit ni skip traerá toooodos
            .skip(Number(desde - 1))//skip sirve para saltar
            .limit(Number(limite))//limit es para limitar con un número
    ]);

    return mensaje(res, 200, {total, usuarios});
};

//Función que inserta el usuario
const usuariosPost = async (req, res = response) => {

    const {
        nombre,
        correo,
        contrasenia,
        rol,
    } = req.body; //desestructuro el body con los valores que son obligatorios

    const usuario = new Usuarios({
        nombre,
        correo,
        contrasenia,
        rol,
        persona:'622a83678a92d1ff9f0ed3cf' //este se debe quitar debido a que no se va registrar si no desde persona
    }); //mando los valores desestructurados al modelo de usuario

    //encriptar la contraseña
    //bcryptjs sirve para encriptar y según el número es la cantidad de vueltas que hace para encriptar
    //entre mayor el numero mas seguro es, pero tarda más en procesar
    const salt = bcryptjs.genSaltSync(10);

    //mando al modelo de usuario.contrasenia la clave encriptada
    usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);

    //guardar en la base de datos
    await usuario.save();

    return mensaje(res, 200, {msg: 'Post API - controlador', usuario});
};

//actualiza información en el servidor
const usuariosPut = async (req, res = response) => {
    const {
        idUsuario
    } = req.params;

    const {
        _id,
        contrasenia,
        google,
        correo,
        ...restUsuario
    } = req.body; //EXCLUYE DE los params a contrasenia, google y correo

    //quiere actualizar contraseña
    if (contrasenia) {
        const salt = bcryptjs.genSaltSync(10);
        restUsuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    }

    const usuario = await Usuarios.findByIdAndUpdate(idUsuario, restUsuario, {new: true}); //LO ENCUENTRA Y ACTUALIZA

    return mensaje(res, 200, usuario);
};

//NO SE USA
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
};

//elimina información del servidor
const usuariosDelete = async (req, res = response) => {

    const {idUsuario} = req.params;

    const uid = req.uid;

    //Elimina al usuario de manera física
    //const usuario = await Usuario.findByIdAndDelete(idUsuario);
    const usuario = await Usuarios.findByIdAndUpdate(idUsuario, {estado: false}, {new: true});
    const usuarioAutenticado = req.usuario;

    return mensaje(res, 200, {usuario, uid, usuarioAutenticado});
};

//se exportan las variables de cada ruta
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};