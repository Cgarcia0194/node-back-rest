const {
    bcryptjs,
    generarJWT,
    googleVerify,
    mensaje,
    response,
} = require('../helpers');

const {Usuarios} = require('../models');

/**
 * Función que sirve para poder loguear o hacer que un usuario ingrese al sistema
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res = response) => {

    const {
        correo,
        contrasenia
    } = req.body;

    try {
        //verificar xi el correo existe
        let usuario = await Usuarios.findOne({
            correo
        }); //busca el usuario mediante su modelo buscandolo por el correo que se ingresa

        //si no hay valores en la variable es porque no coincide el correo
        if (!usuario) {
            return mensaje(res, 400, 'Usuario / contraseña no son correctos');
        }

        //verifica que el usuario que se quiere loguear esté como activo
        if (usuario.estado === false) { //false = inactivo
            return mensaje(res, 400, 'el usuario no está activo');
        }

        //se busca la contraseña comparando por el bcriptjs (contraseña que mete el usuario, contraseña del correo con el que coincidió)
        const contraseniaValida = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

        //si contraseniaValida es false no es correcta
        if (contraseniaValida === false) {
            return mensaje(res, 400, 'la contraseña no es correcta');
        }

        //genera el JWT con los datos del usuario que ya se acaba de loguear en las líneas anteriores
        const token = await generarJWT(usuario.id);

        //regreso a la petción los datos del usuario y el token generado
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return mensaje(res, 400, 'Hable con el administrador');
    }
};

/**
 * Función que sirve para poder traer el token de Google desde el front al backend y la información del correo
 * con el que se está autenticando
 * @param {*} req 
 * @param {*} res 
 */
const googleSignIn = async (req, res = response) => {
    const {
        id_token
    } = req.body;

    try {
        const {
            nombre,
            imagen,
            correo,
            nombre_pila,
            apellido_paterno
        } = await googleVerify(id_token);

        let usuario = await Usuarios.findOne({
            correo
        });

        // if(!usuario){
        //     const data = {
        //         nombre,
        //         correo,
        //         contrasenia: '123456',
        //         img: imagen,
        //         rol: 'USER_ROLE',
        //         google: true
        //     };

        //     usuario = new Usuario(data);
        //     await usuario.save();
        // }

        //si el usuario en bd está inactivo false
        if (usuario.estado === false) {
            return mensaje(res, 401, 'Hable con el administrador, usuario inactivo');
        }

        //genera el JWT con los datos del usuario que ya se acaba de loguear en las líneas anteriores
        const token = await generarJWT(usuario._id);

        res.json({
            "msg": 'Todo bien',
            usuario,
            token
        });

    } catch (error) {
        mensaje(res, 400, 'El token no se pudo verificar');
    }
};

module.exports = {
    login,
    googleSignIn
};