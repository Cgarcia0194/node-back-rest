const mensaje = (res, status = 400, texto = '') => res.status(status).json(texto);

module.exports = {mensaje};