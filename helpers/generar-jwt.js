const jwt = require('jsonwebtoken');//se importa la librería jsonwebtoken que sirve para generar los json web tokens

/**
 * Se crea una promesa para crear el JWT cuando el usuario se loguea o ingresa al sistema
 * @param {*} uid : id del usuario que se loguea y se le va generar el token
 * @returns 
 */
const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        // se desesctructura el uid y se guarda en payload
        const payload = {uid};

        //se usa la función sign mandando el payload y SECRETORPRIVATEKEY que se usa para firmar los tokens
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'//tiempo que durará el JWT
        }, (err, token) => {
            //callback que trata la función sign en caso de que pase un error o no
            if (err) {//cuando existe error se trata con el reject y se manda un error
                console.log(err);
                reject('No se pudo generar el token');
            } else {//cuando está bien se regresa con el resolve y el token generado
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}