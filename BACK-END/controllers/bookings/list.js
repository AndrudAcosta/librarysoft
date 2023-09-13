const conexion = require('../../db/conexion');
const response = require('express')

const listBookings = (req, res = response) => {
    const sql = 'SELECT r.idReserva, r.documento, r.evento, r.fechaReserva, r.horaInicio, r.horaFin, r.fechaSolicitud, er.nombreEstado,ro.nombreRol, b.nombres, b.apellidos, b.correo, r.descripcionReserva FROM reservas r INNER JOIN estadoreserva er ON r.idEstadoReserva = er.idEstadoReserva INNER JOIN usuarios u ON r.documento = u.Documento INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario INNER JOIN roles ro ON u.idRol = ro.idRol where er.nombreEstado = "Confirmada" or er.nombreEstado = "Pendiente";';

    conexion.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener los eventos:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            res.status(200).json(data);
        }
    });
};

const listBooking = (req, res = response) => {
    const idReserva = req.params.idReserva;
    const sql = 'SELECT r.idReserva, r.documento, r.evento, r.descripcionReserva, r.fechaReserva, r.horaInicio, r.horaFin, r.fechaSolicitud, er.nombreEstado,ro.nombreRol, b.nombres, b.apellidos, b.correo FROM reservas r INNER JOIN estadoreserva er ON r.idEstadoReserva = er.idEstadoReserva INNER JOIN usuarios u ON r.documento = u.Documento INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario INNER JOIN roles ro ON u.idRol = ro.idRol WHERE idReserva = ?;';
    const values = [idReserva];

    conexion.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al obtener la reserva:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'reserva no encontrada' });
            } else {
                res.status(200).json(data[0]);
            }
        }
    });
};

module.exports = {
    listBookings,
    listBooking
} 