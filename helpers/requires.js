//se requiere a express, pero se desestructura la función Router
const {
    response,//sirve para traer de forma desestructurada la función response que se usa para las peticiones
    request,
    Router
} = require('express');
//librería que sireve para poder validar campos de diferentes tipos como correos, tamaño, customs, etc
const {check} = require('express-validator');
//requiere la librería bcryptjs, que sirve para encriptar
const bcryptjs = require('bcryptjs');

//requiere librería que sirve para la carga de archivos
const fileUpload = require('express-fileupload');

//requiere path para buscar la ruta
const path = require('path');

const { v4: uuidv4 } = require('uuid');

module.exports = {
    response,
    request,
    Router,
    check,
    bcryptjs,
    fileUpload,
    path,
    uuidv4
}