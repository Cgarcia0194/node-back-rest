const Categoria = require('./catalogos/categoria');
const Colonia = require('./catalogos/colonias');
const Estado = require('./catalogos/estados');
const Movimiento = require('./gastos/movimiento');
const Pais = require('./catalogos/pais');
const Persona = require('./procesos/persona');
const Producto = require('./catalogos/producto');
const Role = require('./catalogos/role');
const Server = require('./server/server');
const Usuarios = require('./procesos/usuario');

module.exports = {
    Categoria,
    Colonia,
    Estado,
    Movimiento,
    Pais,
    Persona,
    Producto,
    Role,
    Server,
    Usuarios
};