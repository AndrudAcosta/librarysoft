const conexion = require('../../../db/conexion');
const response = require('express')

const listCopies = (req, res = response) => {
    const idLibro = req.params.idLibro;
    const sql = 'SELECT ej.idLibro, ej.idEjemplar, u.ubicacionEjemplar,ee.estadoEjemplar, ej.ejemplar, ej.descripcion, ej.disponibilidad FROM ejemplares ej INNER JOIN estadoejemplar ee ON ej.idEstadoEjemplar = ee.idEstadoEjemplar INNER JOIN ubicacionejemplar u ON ej.idUbicacionEjemplar = u.idUbicacionEjemplar WHERE ej.idLibro = ? ORDER BY ej.ejemplar ASC;';
    const values = [idLibro];
  
    conexion.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error al obtener los Ejemplares:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (data.length === 0) {
          res.status(404).json({ msg: 'Ejemplares no encontrados' });
        } else {
          res.status(200).json(data);
        }
      }
    });
  };

const listCopy = (req, res = response) => {
    const idLibro = req.params.idEjemplar;
    const sql = 'SELECT ej.idLibro, ej.idEjemplar,u.ubicacionEjemplar, ee.estadoEjemplar, ej.ejemplar, ej.descripcion, ej.disponibilidad FROM ejemplares ej INNER JOIN estadoejemplar ee ON ej.idEstadoEjemplar = ee.idEstadoEjemplar INNER JOIN ubicacionejemplar u ON ej.idUbicacionEjemplar = u.idUbicacionEjemplar WHERE ej.idEjemplar = ?;';
    const values = [idLibro];

    conexion.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al obtener el libro:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Libro no encontrado' });
            } else {
                res.status(200).json(data[0]);
            }
        }
    });
};

const countCopies = (req, res = response) => {
  const idLibro = req.params.idLibro;

  // Construir la consulta SQL de actualización
  const sql = `
  UPDATE libros
  SET disponibles = (
    SELECT COUNT(*) AS cantidad
    FROM ejemplares
    WHERE disponibilidad = 1 AND idLibro = ${idLibro}
  )
  WHERE idLibro = ${idLibro}
  `;

  // Ejecutar la consulta de actualización
  conexion.query(sql, (err, result) => {
    if (err) {
      console.error('Error al actualizar la cantidad de ejemplares:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ msg: 'Cantidad de ejemplares actualizada correctamente' });
      } else {
        res.status(404).json({ msg: 'No se encontró el libro' });
      }
    }
  });
};

module.exports = {
    listCopies,
    listCopy,
    countCopies
}