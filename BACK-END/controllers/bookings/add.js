const conexion = require('../../db/conexion');
const response = require('express')

const addBooking = (req, res = response) => {
  const {documento, idEstadoReserva, evento, descripcionReserva, fechaReserva, horaInicio, horaFin } = req.body;
  // Verificar que todos los campos requeridos estén presentes
  const sql = 'INSERT INTO reservas (documento, idEstadoReserva, evento, descripcionReserva, fechaReserva, horaInicio, horaFin) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
  const values = [documento, idEstadoReserva, evento, descripcionReserva, fechaReserva, horaInicio, horaFin];

  conexion.query(sql, values, (err) => {
    
    if (err) {
      console.error('Error al agregar la reserva:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
      res.status(201).json({ msg: 'reserva agregada correctamente' });
    }
  });
};

module.exports = {
    addBooking,
  } 