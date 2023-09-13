const conexion = require('../../db/conexion');
const response = require('express')

const updateBooking = (req, res = response) => {
    const { idReserva, idEstadoReserva,fechaReserva, horaInicio, horaFin } = req.body;
  
    if (!idReserva) {
      res.status(400).json({ msg: 'Se requiere el id del Reserva' });
      return;
    }
  
    const sql = 'UPDATE reservas SET idEstadoReserva = ?, fechaReserva = ?, horaInicio = ?, horaFin = ? WHERE idReserva = ?';
    const values = [ idEstadoReserva,fechaReserva, horaInicio, horaFin,idReserva,];
  
    conexion.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el Reserva:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Reserva actualizada correctamente'});
          
        } else {
          res.status(404).json({ msg: 'Reserva no encontrada'});
        }
      }
    });
  };
 
  const updateStateBooking = (req, res = response) => {
    const { idEstadoReserva,idReserva} = req.body;
  
    const sql = 'UPDATE reservas SET idEstadoReserva = ? WHERE idReserva = ?;';
    const values = [ idEstadoReserva,idReserva,];
  
    conexion.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar estado de la Reserva:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Reserva actualizada correctamente'});
          
        } else {
          res.status(404).json({ msg: 'Reserva no encontrada'});
        }
      }
    });
  };

  
module.exports = {
    updateBooking,
    updateStateBooking,
    
} 