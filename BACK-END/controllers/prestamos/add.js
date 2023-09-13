const conexion = require('../../db/conexion');
const response = require('express');

const listarBeneficiarios = (req, res = response) => {
  const filtro = req.query.filtroBeneficiarios || '';

  const sql = `SELECT b.idUsuario, b.idBeneficiario, r.idRol, r.nombreRol, b.nombres, r.plazo, r.cantidadl, r.cantidadp, p.idPrestamo, p.estadoPrestamo, u.estado,
  (SELECT COUNT(*) FROM prestamos WHERE idBeneficiario = b.idBeneficiario AND estadoPrestamo = 1) AS prestamosActivos,
  (SELECT idEsancion FROM sanciones WHERE idBeneficiario = b.idBeneficiario) AS idEsancion,
  (SELECT idModulo FROM permisos WHERE idRol = u.idRol AND idModulo = 5) AS idModulo
 FROM beneficiarios b 
 INNER JOIN usuarios u ON b.idUsuario = u.idUsuario 
 INNER JOIN roles r ON u.idRol = r.idRol 
 LEFT JOIN prestamos p ON b.idBeneficiario = p.idBeneficiario
 WHERE u.documento = '${filtro}';`;

  conexion.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los beneficiarios' });
      return;
    }

    const beneficiariosConCampos = data.map((beneficiario) => {
      if (beneficiario.idEsancion && beneficiario.idEsancion != '2') {
        return {
          tieneSancion: true
        };
      }
      if (beneficiario.estado === 0) {
        return {
          tieneEstado0: true
        };
      }
      if (!beneficiario.plazo || !beneficiario.cantidadl || !beneficiario.cantidadp) {
        return {
          algunCampoNulo: true
        };
      }
      if (beneficiario.prestamosActivos >= beneficiario.cantidadp) {
        return {
          alcanzoMaximo: true
        };
      }

      if (beneficiario.idModulo !== 5) {
        return {
          moduloPrestamoNoHabilitado: true
        };
      }

      return {
        idUsuario: beneficiario.idUsuario,
        idBeneficiario: beneficiario.idBeneficiario,
        idRol: beneficiario.idRol,
        nombreRol: beneficiario.nombreRol,
        nombres: beneficiario.nombres,
        plazo: beneficiario.plazo,
        cantidadl: beneficiario.cantidadl,
        cantidadp: beneficiario.cantidadp,
        idPrestamo: beneficiario.idPrestamo,
        estadoPrestamo: beneficiario.estadoPrestamo,
      };
    });

    res.json({ beneficiarios: beneficiariosConCampos });
  });
};

const listarLibros = (req, res = response) => {
  const filtroLibro = req.query.filtroLibro || '';

  const sql = `SELECT l.isbn, l.titulo, e.ejemplar, e.idEstadoEjemplar, e.idEjemplar
               FROM libros l 
               INNER JOIN ejemplares e ON l.idLibro = e.idLibro 
               WHERE (l.isbn = '${filtroLibro}' OR l.titulo LIKE '%${filtroLibro}%')
               AND e.idEstadoEjemplar IN (1, 2)
               AND e.disponibilidad = 1;`;

  conexion.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los libros' });
      return;
    }

    const librosConCampos = data.map((libro) => ({
      isbn: libro.isbn,
      titulo: libro.titulo,
      ejemplar: libro.ejemplar,
      idEstadoEjemplar: libro.idEstadoEjemplar,
      idEjemplar: libro.idEjemplar,
    }));

    if (librosConCampos.length === 0) {
      res.json({ alerta: 'No se encontraron libros disponibles' });
    } else {
      res.json({ libros: librosConCampos });
    }
  });
};

const agregarPrestamo = async (req, res = response) => {
  const { idBeneficiario, fechaActualGlobal, fechaCompromisoGlobal, libros } = req.body;
  // Obtén la fecha actual en la zona horaria del servidor
  const fechaActualServidor = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const fechaInicio = new Date(fechaActualServidor);

  const fechaCompromiso = new Date(fechaCompromisoGlobal);
  fechaCompromiso.setHours(fechaCompromiso.getHours() + fechaCompromiso.getTimezoneOffset() / 60);

  // Insertar datos en la tabla prestamos
  const insertPrestamoQuery = `INSERT INTO prestamos (idBeneficiario, fechaInicio, fechaCompromiso) VALUES (?,?,?)`;

  conexion.query(insertPrestamoQuery, [idBeneficiario, fechaInicio, fechaCompromiso], async (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al insertar datos en la tabla prestamos' });
      return;
    }

    const idPrestamo = result.insertId;

    // Insertar datos en la tabla prestamos_libros
    const insertPrestamoLibroQuery = `INSERT INTO prestamos_libros (idEjemplar, idPrestamo, estadoEjemplar, idEstadoPrestamo) VALUES (?, ?, ?, ?)`;

    try {
      for (const libro of libros) {
        const idEjemplar = libro.idEjemplar;
        const idEstadoEjemplar = libro.idEstadoEjemplar;

        await conexion.query(insertPrestamoLibroQuery, [idEjemplar, idPrestamo, idEstadoEjemplar, 1]); // Agrega 1 como idEstadoPrestamo
      }

      res.status(200).json({ message: 'Datos insertados correctamente' }); // Enviar la respuesta al cliente aquí
    } catch (error) {
      res.status(500).json({ error: 'Error al insertar datos en la tabla prestamos_libros' });
    }

    // Actualizar la disponibilidad de los ejemplares en la tabla ejemplares
    const idEjemplares = libros.map((libro) => libro.idEjemplar);
    const updateEstadoEjemplarQuery = `UPDATE ejemplares SET disponibilidad = 0, idUbicacionEjemplar = 3 WHERE idEjemplar IN (${idEjemplares.join(',')})`;


    conexion.query(updateEstadoEjemplarQuery, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al actualizar el campo idEstadoEjemplar de los ejemplares' });
        return;
      }

    });
  });
};

module.exports = {
  listarBeneficiarios,
  listarLibros,
  agregarPrestamo
};
