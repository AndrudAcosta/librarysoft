const conexion = require('../../db/conexion');
const response = require('express');

// Método GET para listar el formulario y la tabla de edición del préstamo y los libros
const verPrestamoUpdate = (req, res = response) => {
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
    pl.idEjemplar,
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
          rol: data[0].nombreRol,
        },
      },
      libros: [],
    };

    data.forEach((row) => {
      if (row.isbn && row.titulo) {
        prestamo.libros.push({
          idEjemplar: row.idEjemplar,
          isbn: row.isbn,
          titulo: row.titulo,
          ejemplar: row.ejemplar,
          idEstadoEjemplar: row.idEstadoEjemplar,
          fechaDevolucion: row.fechaDevolucion,
          idEstadoLibro: row.idEstadoLibro,
          idEstadoPrestamo: row.idEstadoPrestamo, 
        });
      }
    });

    res.json(prestamo);
  });
};

const obtenerEstadosEjemplares = (req, res = response) => {
  const sqlEjemplares = `
    SELECT idEstadoEjemplar, estadoejemplar
    FROM estadoejemplar
    WHERE estadoejemplar IN ('Buen estado', 'Regular')`;

  const sqlEstadosPrestamo = `SELECT idEstadoPrestamo, nombreEstado FROM estadoprestamo`;

  conexion.query(sqlEjemplares, (errEjemplares, ejemplarData) => {
    if (errEjemplares) {
      console.error('Error al obtener los estados de ejemplares:', errEjemplares);
      res.status(500).json({ error: 'Error al obtener los estados de ejemplares' });
      return;
    }

    conexion.query(sqlEstadosPrestamo, (errPrestamo, prestamoData) => {
      if (errPrestamo) {
        console.error('Error al obtener los estados de préstamo:', errPrestamo);
        res.status(500).json({ error: 'Error al obtener los estados de préstamo' });
        return;
      }

      // Combinar ambos conjuntos de estados en un solo arreglo
      const todosLosEstados = [
        ...ejemplarData.map(ejemplar => ({ id: ejemplar.idEstadoEjemplar, nombre: ejemplar.estadoejemplar })),
        ...prestamoData.map(prestamo => ({ id: prestamo.idEstadoPrestamo, nombre: prestamo.nombreEstado }))
      ];

      res.json(todosLosEstados);
    });
  });
};

const actualizarPrestamo = async (req, res = response) => {
  const idPrestamo = req.body.idPrestamo;
  const librosArray = req.body.libros;

  for (const libro of librosArray) {
    const { idEjemplar, idEstadoEjemplar } = libro;

    // Verifica el estado del libro y actualiza la tabla prestamos_libros según corresponda
    if (idEstadoEjemplar === 4) {
      // Si el estado es "Perdido," actualiza idEstadoPrestamo, fechaDevolución e idEstadoLibro
      const sqlActualizarLibroPerdido = `
        UPDATE prestamos_libros
        SET idEstadoPrestamo = ?, fechaDevolucion = NOW(), idEstadoLibro = 0
        WHERE idPrestamo = ? AND idEjemplar = ?`;

      try {
        await conexion.query(sqlActualizarLibroPerdido, [idEstadoEjemplar, idPrestamo, idEjemplar]);
      } catch (error) {
        conexion.rollback(() => {
          console.error('Error al actualizar el estado del ejemplar en la tabla prestamos_libros:', error);
          res.status(500).json({ error: 'Error al actualizar el préstamo' });
        });
        return;
      }
    } else if (idEstadoEjemplar === 1 || idEstadoEjemplar === 2) {
      // Si el estado es "Buen estado" o "Regular," actualiza fechaDevolución e idEstadoLibro
      const sqlActualizarLibroBuenoRegular = `
        UPDATE prestamos_libros
        SET idEstadoPrestamo = 2 ,fechaDevolucion = NOW(), idEstadoLibro = 0
        WHERE idPrestamo = ? AND idEjemplar = ?`;

      try {
        await conexion.query(sqlActualizarLibroBuenoRegular, [idPrestamo, idEjemplar]);
      } catch (error) {
        conexion.rollback(() => {
          console.error('Error al actualizar el estado del ejemplar en la tabla prestamos_libros:', error);
          res.status(500).json({ error: 'Error al actualizar el préstamo' });
        });
        return;
      }
    }

    // Luego, verifica el estado del libro y actualiza la tabla ejemplares según corresponda
    if (idEstadoEjemplar === 4) {
      // Si el estado es "Perdido," solo actualiza la disponibilidad en la tabla ejemplares
      const sqlActualizarEjemplarEnEjemplares = `
        UPDATE ejemplares
        SET disponibilidad = 0, idUbicacionEjemplar = 2
        WHERE idEjemplar = ?`;

      try {
        await conexion.query(sqlActualizarEjemplarEnEjemplares, [idEjemplar]);
      } catch (error) {
        conexion.rollback(() => {
          console.error('Error al actualizar la disponibilidad del ejemplar en la tabla ejemplares:', error);
          res.status(500).json({ error: 'Error al actualizar el préstamo' });
        });
        return;
      }
    } else if (idEstadoEjemplar === 1 || idEstadoEjemplar === 2) {
      // Si el estado es "Buen estado" o "Regular," actualiza el estado y la disponibilidad en la tabla ejemplares
      const sqlActualizarEjemplarEnEjemplares = `
        UPDATE ejemplares
        SET idEstadoEjemplar = ?, disponibilidad = 1, idUbicacionEjemplar = 1
        WHERE idEjemplar = ?`;

      try {
        await conexion.query(sqlActualizarEjemplarEnEjemplares, [idEstadoEjemplar, idEjemplar]);
      } catch (error) {
        conexion.rollback(() => {
          console.error('Error al actualizar el estado del ejemplar en la tabla ejemplares:', error);
          res.status(500).json({ error: 'Error al actualizar el préstamo' });
        });
        return;
      }
    }
  }

  // Verificar si hay libros con estado 1 en la base de datos
  const sqlVerificarDevolucion = `
    SELECT COUNT(*) AS count
    FROM prestamos_libros
    WHERE idPrestamo = ? AND idEstadoLibro = 1`;

  conexion.query(sqlVerificarDevolucion, [idPrestamo], (err, results) => {
    if (err) {
      conexion.rollback(() => {
        console.error('Error al verificar la devolución de libros:', err);
        res.status(500).json({ error: 'Error al actualizar el préstamo' });
      });
      return;
    }

    const count = results[0].count;

    if (count === 0) {
      // No hay libros con estado en 1, por lo que se puede finalizar el préstamo
      const sqlActualizarPrestamo = `
        UPDATE prestamos
        SET estadoPrestamo = 0
        WHERE idPrestamo = ?`;

      conexion.query(sqlActualizarPrestamo, [idPrestamo], (err) => {
        if (err) {
          conexion.rollback(() => {
            console.error('Error al actualizar el estado del préstamo:', err);
            res.status(500).json({ error: 'Error al actualizar el préstamo' });
          });
          return;
        }

        // Confirmar la transacción si todo se realizó con éxito
        conexion.commit((err) => {
          if (err) {
            conexion.rollback(() => {
              console.error('Error al confirmar la transacción:', err);
              res.status(500).json({ error: 'Error al actualizar el préstamo' });
            });
          } else {
            res.json({ message: 'Préstamo actualizado exitosamente' });
          }
        });
      });
    } else {
      // Al menos un libro tiene estado en 1, lo que significa que no se ha actualizado por completo el préstamo
      // Envía un mensaje indicando que el libro se ha actualizado y finaliza la función
      conexion.rollback(() => {
        res.status(200).json({ message: 'Libro actualizado exitosamente' });
      });
    }
  });
};

module.exports = {
  actualizarPrestamo,
  verPrestamoUpdate,
  obtenerEstadosEjemplares,
};