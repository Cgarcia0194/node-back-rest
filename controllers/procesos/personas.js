const {
    Persona,
    Usuario
} = require('../../models');

const {
    respuesta,
    request,
    response,
    encriptarTexto,
    compararTextoEncriptado
} = require('../../helpers');

const {
    dbConnection
} = require("../../DB/config");

const {
    QueryTypes
} = require("sequelize");

const registrarPersona = async (req, res = response) => {

    const {
        txtNombre,
        txtApellidoPaterno,
        txtApellidoMaterno,
        txtRFC,
        txtCURP,
        cmbGenero,
        txtTel,
        txtTelFijo,
        txtFechaNac,
        txtEdad,
        txtCorreo,
        cmbEstadoCivil,
        cmbNacionalidad,
        cmbMunicipio
    } = req.body;

    const data = {
        nombre: txtNombre,
        apellido_paterno: txtApellidoPaterno,
        apellido_materno: txtApellidoMaterno,
        rfc: txtRFC,
        curp: txtCURP,
        genero: cmbGenero,
        telefono: txtTel,
        telefono_fijo: txtTelFijo,
        fecha_nacimiento: txtFechaNac,
        edad: txtEdad,
        correo_electronico: txtCorreo,
        estado_civil: cmbEstadoCivil,
        nacionalidad: cmbNacionalidad,
        municipio: cmbMunicipio,
    }

    try {
        const persona = Persona.build(data);
        await persona.save();

        //se registra el usuario aquí

        const anio = new Date().getFullYear();
        const nombre_usuario = `${anio}0000${persona.id}`;

        const contraseniaEncrip = encriptarTexto(nombre_usuario);

        const data_usuario = {
            nombre: nombre_usuario,
            correo: txtCorreo,
            google: false,
            contrasenia: contraseniaEncrip,
            persona: persona.id
        }

        const usuario = Usuario.build(data_usuario);
        await usuario.save();

        return respuesta(res, 200, 'success', 'Se ha registrado la persona correctamente', {
            persona,
            usuario
        });
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

const actualizarPersona = async (req, res = response) => {
    const {
        idPersona,
        txtNombre,
        txtApellidoPaterno,
        txtApellidoMaterno,
        txtRFC,
        txtCURP,
        cmbGenero,
        txtTel,
        txtTelFijo,
        txtFechaNac,
        txtEdad,
        txtCorreo,
        cmbEstadoCivil,
        cmbNacionalidad,
        cmbMunicipio
    } = req.body;

    try {

        const data = {
            id: idPersona,
            nombre: txtNombre,
            apellido_paterno: txtApellidoPaterno,
            apellido_materno: txtApellidoMaterno,
            rfc: txtRFC,
            curp: txtCURP,
            genero: cmbGenero,
            telefono: txtTel,
            telefono_fijo: txtTelFijo,
            fecha_nacimiento: txtFechaNac,
            edad: txtEdad,
            correo_electronico: txtCorreo,
            estado_civil: cmbEstadoCivil,
            nacionalidad: cmbNacionalidad,
            municipio: cmbMunicipio,
        }

        const persona = await Persona.findByPk(idPersona);

        if (!persona) {
            return respuesta(res, 400, 'info', 'No existe la persona con el id: ' + idPersona);
        }

        await persona.update(data);

        return respuesta(res, 200, 'success', 'Se ha actualizado la info de manera correcta', persona);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

const actualizarUsuario = async (req, res = response) => {
    const {
        txtCorreo,
        txtContraseniaActual,
        txtContraseniaNueva
    } = req.body;

    try {
        //traigo el id del JWT
        const id = req.usuario.id;

        //comparo la contrasenia actual con la contrasenia del usuario
        const pssActualEncript = compararTextoEncriptado(txtContraseniaActual, req.usuario.contrasenia);

        //se compara si el correo y la contrasenia están bien
        if (pssActualEncript === true) {
            //encripto la nuevacontrasenia
            const pssNuevaEncript = encriptarTexto(txtContraseniaNueva);

            const data = {
                id,
                correo: txtCorreo,
                contrasenia: pssNuevaEncript
            };

            //se trae el usuario que se va actualizar
            const usuario = await Usuario.findByPk(id);

            //se actualiza el usuario
            await usuario.update(data);

            return respuesta(res, 200, 'success', 'Se ha actualizado la info de manera correcta', usuario);
        } else {
            return respuesta(res, 500, 'info', 'El correo o la contraseña no coinciden', null);
        }
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

const eliminarPersona = async (req, res = response) => {

    const {
        idUsuario
    } = req.body;

    try {

        const usuario = await dbConnection.query(
            'SELECT personas.*, usuarios.estatus FROM usuarios INNER JOIN personas ON personas.id = usuarios.persona WHERE usuarios.id = :id ', {
                replacements: {
                    id: idUsuario
                },
                type: QueryTypes.SELECT
            }
        );


        if (!usuario || usuario.length === 0) {
            return respuesta(res, 200, 'info', 'No existe el usuario con el id: ' + idUsuario);
        }

        await dbConnection.query(
            'UPDATE usuarios SET estatus = 2 WHERE usuarios.id = :idUsuario ', {
                replacements: {
                    idUsuario
                },
                type: QueryTypes.UPDATE
            }
        );

        return respuesta(res, 200, 'success', `Se ha desactivado la persona y el usuario ${usuario[0].nombre} correctamente`, usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin');
    }
};

const consultarPersonas = async (req, res = response) => {

    const usuarios = await dbConnection.query(
        'SELECT personas.*, usuarios.estatus AS usuarios_estatus, usuarios.correo AS usuarios_correo FROM usuarios INNER JOIN personas ON personas.id = usuarios.persona ', {
            type: QueryTypes.SELECT
        }
    );

    // const usuarios = await Usuario.findAll();

    if (!usuarios || usuarios.length === 0) {
        return respuesta(res, 200, 'info', 'La tabla no tiene usuarios registrados');
    }

    return respuesta(res, 200, 'success', 'Información consultada correctamente', usuarios);
};

const consultarPersona = async (req = request, res = response) => {

    try {

        const id = req.usuario.id;

        const usuario = await dbConnection.query(
            'SELECT personas.*, usuarios.estatus AS usuarios_estatus, usuarios.correo AS usuarios_correo, estados.id AS estados_id, paises.id AS paises_id FROM usuarios INNER JOIN personas ON personas.id = usuarios.persona JOIN municipios ON municipios.id = personas.municipio JOIN estados ON estados.id = municipios.estado JOIN paises ON paises.id = estados.pais WHERE usuarios.id = :id ', {
                replacements: {
                    id
                },
                type: QueryTypes.SELECT
            }
        );

        if (!usuario || usuario.length === 0) {
            return respuesta(res, 200, 'info', 'No existe el usuario con el id: ' + id);
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', usuario);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

const consultarNacionalidades = async (req = request, res = response) => {

    try {

        const paises = await dbConnection.query(
            'SELECT *, estatus + 0 AS estatus_indice FROM paises ', {
                type: QueryTypes.SELECT
            }
        );

        if (!paises || paises.length === 0) {
            return respuesta(res, 200, 'info', 'No hay paises registrados');
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', paises);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

const consultarPaises = async (req = request, res = response) => {

    try {

        const paises = await dbConnection.query(
            'SELECT *, estatus + 0 AS estatus_indice FROM paises ', {
                type: QueryTypes.SELECT
            }
        );

        if (!paises || paises.length === 0) {
            return respuesta(res, 200, 'info', 'No hay paises registrados');
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', paises);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

const consultarEstados = async (req = request, res = response) => {

    try {

        const {
            idPais
        } = req.body;

        const estados = await dbConnection.query(
            'SELECT *, estatus + 0 AS estatus_indice FROM estados WHERE pais = :id', {
                replacements: {
                    id: idPais
                },
                type: QueryTypes.SELECT
            }
        );

        if (!estados || estados.length === 0) {
            return respuesta(res, 200, 'info', 'No hay estados registrados con el pais seleccionado');
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', estados);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

const consultarMunicipios = async (req = request, res = response) => {

    try {

        const {
            idEstado
        } = req.body;

        const municipios = await dbConnection.query(
            'SELECT *, estatus + 0 AS estatus_indice FROM municipios WHERE estado = :id', {
                replacements: {
                    id: idEstado
                },
                type: QueryTypes.SELECT
            }
        );

        if (!municipios || municipios.length === 0) {
            return respuesta(res, 200, 'info', 'No hay municipios registrados con el estado seleccionado');
        }

        return respuesta(res, 200, 'success', 'Información consultada correctamente', municipios);
    } catch (error) {
        console.log(error);
        return respuesta(res, 500, 'error', 'Hable con un admin', null);
    }
};

module.exports = {
    registrarPersona,
    actualizarPersona,
    actualizarUsuario,
    eliminarPersona,
    consultarPersonas,
    consultarPersona,
    consultarNacionalidades,
    consultarPaises,
    consultarEstados,
    consultarMunicipios
};