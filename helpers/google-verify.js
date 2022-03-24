const {OAuth2Client} = require('google-auth-library');//importa la librería de google auth para entrar con correo de google

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * función que sirve para verificar el token que se manda es correcto
 * @param {*} token 
 */
async function googleVerify(token = '') {
    const ticket = await client.verifyIdToken({ //sirve para verificar el token de Google
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const {
        name,
        picture,
        email,
        given_name,
        family_name
    } = ticket.getPayload();

    return {
        nombre: name,
        imagen: picture,
        correo: email,
        nombre_pila: given_name,
        apellido_paterno: family_name
    }
};

module.exports = {
    googleVerify
};