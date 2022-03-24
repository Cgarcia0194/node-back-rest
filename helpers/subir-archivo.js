const {
    path,
    uuidv4
} = require(__dirname + '/requires'); //este se debe imortar desde requires ya que con index manda alerta en consola

/**
 * Función que sirve para subir un archivo
 * @param {*} files : trae la información del archivo desde req.files
 * @param {*} extensionesValidas : son las extensiones que se permiten, si no se indican están unas por defecto
 * @param {*} carpeta :el nombre de la carpeta donde se va a insertar el archivo, si no lo trae lo pone en raiz de uploads
 * @returns 
 */
const subirArchivo = (files, extensionesValidas = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'application/pdf'], carpeta = '') => {
    //desestructuro el archivo que es el nombre que viene en el body en el formdata con nombre archivo

    return new Promise((resolve, reject) => {
        const {
            archivo
        } = files; //este nombre se debe mandar como parámetro ya que es el nombre clave, si se manda otro no lo toma en cuenta

        //valido que se esté mandando con ese nombre de key
        if (!archivo) {
            return reject('No se encontró el nombre del key que se debe mandar');
        }

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(archivo.mimetype)) {
            return reject(`el archivo ${archivo.name} tiene la extensión ${archivo.mimetype} y no es permitida [${extensionesValidas}]`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        //se ubica la ruta donde se insertará el archivo
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);

        //se sube el archivo al repositorio o carpeta que se indicó
        archivo.mv(uploadPath, err => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });
};

module.exports = {
    subirArchivo
};