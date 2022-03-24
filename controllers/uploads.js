const path = require('path');
const fs = require('fs');
const {
    mensaje,
    response,
    subirArchivo
} = require('../helpers');

const {
    Producto,
    Usuarios,
} = require('../models');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const guardarArchivo = async (req, res = response) => {
    try {
        const nombreArchivo = await subirArchivo(req.files, undefined);
        mensaje(res, 200, {
            nombreArchivo
        });
    } catch (error) {
        mensaje(res, 400, {
            error
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const actualizarArchivo = async (req, res = response) => {
    const {
        coleccion,
        id
    } = req.params;

    switch (coleccion) {
        case 'usuarios':
            subirNuevoArchivo(req, res, Usuarios, id, coleccion);
            break;
        case 'productos':
            subirNuevoArchivo(req, res, Producto, id, coleccion);
            break;
        default:
            mensaje(res, 500, 'falta validar esto');
            break;
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const consultarArchivo = async (req, res = response) => {
    const {
        coleccion,
        id
    } = req.params;
    let img;
    let mod;

    switch (coleccion) {
        case 'usuarios':
            mod = await Usuarios.findById(id);

            if (!mod) {
                return mensaje(res, 400, {
                    msg: `No existe el id: ${id} para el modelo ${mod}`
                });
            }
            break;
        case 'productos':
            mod = await Producto.findById(id);

            if (!mod) {
                return mensaje(res, 400, {
                    msg: `No existe el id: ${id} para el modelo ${mod}`
                });
            }
            break;
        default:
            mensaje(res, 500, 'falta validar esto');
            break;
    }

    if (mod.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, mod.img);

        if (fs.existsSync(pathImagen)) {
            img = res.sendFile(pathImagen);
            return img;
        }
    }

    const imgPredeterminada = path.join(__dirname, '../public/assets', 'no-image.jpg');

    if (fs.existsSync(imgPredeterminada)) {
        img = res.sendFile(imgPredeterminada);
        return img;
    } else {
        return mensaje(res, 400, {
            msg: "La imagen predeterminada no está en la ruta"
        });
    }
};

/**
 * Función que sirve para ahorrar el switch ya que se repite el código
 * @param {*} req : es valor de la request
 * @param {*} res : valor de la response
 * @param {*} modelo : son los modelos como Usuarios, Producto
 * @param {*} id : id que se va asociar al model
 * @param {*} carpeta : es el nombre de la carpeta que se va a alojar
 */
const subirNuevoArchivo = async (req, res, modelo, id, carpeta) => {

    const mod = await modelo.findById(id);

    if (!mod) {
        mensaje(res, 400, {
            msg: `No existe un el id: ${id} para el modelo ${mod}`
        });
    }

    //limpiar archivos previos
    if (mod.img) {
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', carpeta, mod.img);

        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, carpeta);
    mod.img = nombre;
    await mod.save();

    mensaje(res, 200, mod);
};

module.exports = {
    guardarArchivo,
    actualizarArchivo,
    consultarArchivo
}