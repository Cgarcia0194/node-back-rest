const {
    mensaje,
    response
} = require('../../helpers');
const {
    Movimiento
} = require('../../models');

//Función que crea el movimiento
const crearMovimiento = async (req, res = response) => {
    const {
        txtConcepto,
        txtTotal,
        txtFechaMovimiento,
        txtCantidadMeses,
        chboxLiquidado,
        txtFechaLiquidacion,
        txtMetodoLiquidacion,
        txtCantidadLiquidacion,
        txtMetodoPago,
        txtObservacion,
        idPersona
    } = req.body;

    const movimientoDB = await Movimiento.findOne({
        concepto: txtConcepto,
        total: txtTotal,
        fecha_movimiento: txtFechaMovimiento,
        cantidad_meses: txtCantidadMeses
    });

    if (movimientoDB) {
        return mensaje(res, 400, `Ya existe un movimiento con el concepto '${concepto}' total: ${total} y fecha movimiento: ${fecha_movimiento}`);
    }

    const data = {
        concepto: txtConcepto,
        total: txtTotal,
        fecha_movimiento: txtFechaMovimiento,
        cantidad_meses: txtCantidadMeses,
        liquidado: chboxLiquidado,
        fecha_liquidacion: txtFechaLiquidacion,
        metodo_liquidacion: txtMetodoLiquidacion,
        cantidad_liquidacion: txtCantidadLiquidacion,
        metodo_pago: txtMetodoPago,
        observacion: txtObservacion,
        persona: idPersona,
        usuario: req.usuario._id,
    };

    const movimiento = new Movimiento(data);

    await movimiento.save();

    return mensaje(res, 200, movimiento);
};


module.exports = {
    crearMovimiento
}