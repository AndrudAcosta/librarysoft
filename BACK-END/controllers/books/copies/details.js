const conexion = require('../../../db/conexion');
const response = require('express')

const listCopyInLoan = (req, res = response) => {
    const idEjemplar = req.params.idEjemplar;
    const sql = 'SELECT IdPrestamo FROM prestamos_libros WHERE idEjemplar = ? AND idEstadoPrestamo <> 2;';
    const values = [idEjemplar];

    conexion.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al obtener el Ejemplar prestado:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Ejemplar no encontrado' });
            } else {
                res.status(200).json(data[0]);
            }
        }
    });
};


  module.exports = {
    listCopyInLoan
  }