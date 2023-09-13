const conexion = require('../../db/conexion');
const response = require('express');

// Función para listar préstamos
const ListarPrestamos = (req, res = response) => {
  const filtroPrestamos = req.query.filtroPrestamos || '';

  const sql = `
    SELECT pr.idPrestamo, pr.idBeneficiario, pr.fechaInicio, pr.fechaCompromiso,
    CASE pr.estadoPrestamo WHEN 1 THEN 'Activo' ELSE 'Finalizado' END AS estadoPrestamo,
    b.nombres,
    u.documento,
    r.nombreRol
    FROM prestamos pr
    INNER JOIN beneficiarios b ON pr.idBeneficiario = b.idBeneficiario
    INNER JOIN usuarios u ON b.idUsuario = u.idUsuario
    INNER JOIN roles r ON u.idRol = r.idRol
    WHERE u.documento = '${filtroPrestamos}' OR b.nombres LIKE '%${filtroPrestamos}%'
  `;

  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los préstamos:', err);
      res.status(500).json({ error: 'Error al obtener los préstamos' });
      return;
    }

    const prestamos = data.map(async (prestamo) => {
      // Verifica si algún libro asociado a este préstamo tiene idEstadoPrestamo igual a 3
      const librosNoDevueltos = await verificarLibrosNoDevueltos(prestamo.idPrestamo);

      return {
        idPrestamo: prestamo.idPrestamo,
        idBeneficiario: prestamo.idBeneficiario,
        nombres: prestamo.nombres,
        nombreRol: prestamo.nombreRol,
        estadoPrestamo: prestamo.estadoPrestamo,
        fechaInicio: new Date(prestamo.fechaInicio).toLocaleDateString('es-ES'),
        fechaCompromiso: new Date(prestamo.fechaCompromiso).toLocaleDateString('es-ES'),
        documento: prestamo.documento,
        librosNoDevueltos: librosNoDevueltos,
      };
    });

    Promise.all(prestamos)
      .then((prestamosData) => {
        // Envía una respuesta JSON al front-end (puedes omitir esta línea si solo deseas el console.log)
        res.json({ prestamos: prestamosData });
      })
      .catch((error) => {
        console.error('Error al obtener los préstamos:', error);
        res.status(500).json({ error: 'Error al obtener los préstamos' });
      });
  });
};

// Función para verificar si algún libro relacionado con el préstamo no ha sido devuelto
function verificarLibrosNoDevueltos(idPrestamo) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) AS librosNoDevueltos
      FROM prestamos_libros
      WHERE idPrestamo = ${idPrestamo} AND idEstadoPrestamo = 3
    `;

    conexion.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data[0].librosNoDevueltos > 0);
    });
  });
}

module.exports = {
  ListarPrestamos
};
