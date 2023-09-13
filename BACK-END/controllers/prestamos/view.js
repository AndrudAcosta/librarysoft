const conexion = require('../../db/conexion');
const response = require('express');

const verPrestamo = (req, res = response) => {
  const idPrestamo = req.params.idPrestamo;

  const sql = `
    SELECT 
      pr.idPrestamo,
      pr.fechaInicio,
      pr.fechaCompromiso,
      pr.estadoPrestamo,
      be.idBeneficiario,
      be.nombres,
      be.apellidos,
      us.idUsuario,
      us.documento,
      ro.nombreRol,
      li.isbn,
      li.titulo,
      ej.ejemplar,
      ej.idEstadoEjemplar,
      pl.fechaDevolucion,
      pl.idEstadoLibro,
      pl.idEstadoPrestamo
    FROM prestamos AS pr
    LEFT JOIN beneficiarios AS be ON pr.idBeneficiario = be.idBeneficiario
    LEFT JOIN usuarios AS us ON be.idUsuario = us.idUsuario
    LEFT JOIN roles AS ro ON us.idRol = ro.idRol
    LEFT JOIN prestamos_libros AS pl ON pr.idPrestamo = pl.idPrestamo
    LEFT JOIN ejemplares AS ej ON pl.idEjemplar = ej.idEjemplar
    LEFT JOIN libros AS li ON ej.idLibro = li.idLibro
    WHERE pr.idPrestamo = ?;`;

  conexion.query(sql, [idPrestamo], (err, data) => {
    if (err) {
      console.error('Error al obtener el préstamo:', err);
      res.status(500).json({ error: 'Error al obtener el préstamo' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ error: 'Préstamo no encontrado' });
      return;
    }

    const prestamo = {
      idPrestamo: data[0].idPrestamo,
      fechaInicio: data[0].fechaInicio,
      fechaCompromiso: data[0].fechaCompromiso,
      estadoPrestamo: data[0].estadoPrestamo === 1 ? 'Activo' : 'Finalizado',
      beneficiario: {
        idBeneficiario: data[0].idBeneficiario,
        nombres: data[0].nombres,
        apellidos: data[0].apellidos,
        usuario: {
          idUsuario: data[0].idUsuario,
          documento: data[0].documento,
          rol: data[0].nombreRol
        }
      },
      libros: []
    };

    data.forEach((row) => {
      if (row.isbn && row.titulo) {
        // Agrega una consulta para obtener el nombre del estado de préstamo para cada libro
        const idEstadoPrestamo = row.idEstadoPrestamo;
        const obtenerNombreEstadoPrestamoSql = `
          SELECT nombreEstado FROM estadoprestamo WHERE idEstadoPrestamo = ?;
        `;

        conexion.query(obtenerNombreEstadoPrestamoSql, [idEstadoPrestamo], (err, estadoPrestamoData) => {
          if (err) {
            console.error('Error al obtener el estado de préstamo:', err);
            res.status(500).json({ error: 'Error al obtener el estado de préstamo' });
            return;
          }

          const nombreEstadoPrestamo = estadoPrestamoData[0].nombreEstado;

          prestamo.libros.push({
            isbn: row.isbn,
            titulo: row.titulo,
            ejemplar: row.ejemplar,
            idEstadoEjemplar: row.idEstadoEjemplar,
            fechaDevolucion: row.fechaDevolucion,
            estadoPrestamo: nombreEstadoPrestamo // Agrega el nombre del estado de préstamo al libro
          });

          // Envía la respuesta cuando se hayan procesado todos los libros
          if (prestamo.libros.length === data.length) {
            res.json(prestamo);
          }
        });
      }
    });
  });
};





module.exports = {
  verPrestamo,
};
