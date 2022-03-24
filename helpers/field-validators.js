const estadosCiviles = ['Casado', 'Divorciado', 'Soltero', 'Unión libre', 'Viudo', 'Sin especificar'];

/**
 * Función que sirve para poder buscar el estado civil
 * @param {*} estadoCivil : variable que contiene el estado civil
 */
const validarEstadoCivil = (estadoCivil = '') => {
    const empataEstadoCivil = estadosCiviles.includes(estadoCivil);

    if (!empataEstadoCivil) {
        throw new Error(`El estado civil ${empataEstadoCivil} debe ser uno de los siguientes: ${estadosCiviles}`);
    } else {
        return true;
    }
};

/**
 * Función que sirve para poder validar el formato de curp
 * @param {*} curp : variable que contiene la curp
 * @returns 
 */
const validarCURP = (curp = '') => {
    const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado) { //Coincide con el formato general?
        return false;
    }

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        let diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma = 0.0,
            lngDigito = 0.0;
        for (let i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
        return false;

    return true; //Validado
};

//se exportan las funciones para que sean usadas en otros archivos JS
module.exports = {
    validarEstadoCivil,
    validarCURP
};