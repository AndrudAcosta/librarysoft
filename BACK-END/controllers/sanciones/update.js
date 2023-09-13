const conexion = require('../../db/conexion');
const response = require('express')


//METODO GET PARA LISTAR EN EL FORMULARIO DE EDITAR LOS BENEFICIARIOS Y  USUARIOS 
const listarSancionesUp = (req, res = response) => {
  const id = req.params.idSancion;
  const sql = `
  SELECT b.idBeneficiario, b.nombres, b.apellidos, s.idEsancion, s.idTsancion, s.fechaAsignacion, s.fechaCierre, s.idSancion, s.observacion, t.nombreTipo, e.nombreEstado
  FROM sanciones s
  INNER JOIN beneficiarios b ON s.idBeneficiario = b.idBeneficiario
  INNER JOIN estadosancion e ON e.idEsancion = s.idEsancion
  INNER JOIN tiposancion t ON t.idTsancion = s.idTsancion
  WHERE s.idSancion = ?;
  `;

  conexion.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error al obtener la sancion:', err);
      res.status(500).json({ error: 'Error al obtener la sancion' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ error: 'Sancion no encontrado' });
      return;
    }

    const sancion = data[0];
    const nombres = sancion.nombres;
    const apellidos = sancion.apellidos;
    const estadosancion = sancion.nombreEstado;
    const tiposancion = sancion.nombreTipo;
    const fechaAsignacion = sancion.fechaAsignacion;
    const fechaCierre = sancion.fechaCierre;
    const observacion = sancion.observacion;


    res.json(sancion);
  });
};

// METODO PUT para actualizar los datos de un beneficiario y usuario específico

const actualizarSancion = (req, res = response) => {
  const idSancion = req.params.idSancion;
  const { nombreEstado, nombreTipo, observacion } = req.body;

  // Obtener el idEsancion correspondiente al nombreEstado
  const sqlObtenerIdEsancion = `
    SELECT idEsancion
    FROM estadosancion
    WHERE nombreEstado = ?;
  `;

  conexion.query(sqlObtenerIdEsancion, [nombreEstado], (err, dataSanciones) => {
    if (err) {
      console.error('Error al obtener el idEsancion:', err);
      res.status(500).json({ error: 'Error al obtener el idEsancion' });
      return;
    }

    if (dataSanciones.length === 0) {
      res.status(404).json({ error: 'Estado no encontrado' });
      return;
    }

    const idEsancion = dataSanciones[0].idEsancion;

    // Obtener el idTsancion correspondiente al nombreTipo
    const sqlObtenerIdTsancion = `
      SELECT idTsancion
      FROM tiposancion
      WHERE nombreTipo = ?;
    `;

    conexion.query(sqlObtenerIdTsancion, [nombreTipo], (err, dataTipos) => {
      if (err) {
        console.error('Error al obtener el idTsancion:', err);
        res.status(500).json({ error: 'Error al obtener el idTsancion' });
        return;
      }

      if (dataTipos.length === 0) {
        res.status(404).json({ error: 'Tipo no encontrado' });
        return;
      }

      const idTsancion = dataTipos[0].idTsancion;

      // Actualizar datos en la tabla sanciones
      const sqlSanciones = `
        UPDATE sanciones
        SET idEsancion = ?, idTsancion = ?, observacion = ?
        WHERE idSancion = ?;
      `;

      conexion.query(sqlSanciones, [idEsancion, idTsancion, observacion, idSancion], (err, resultSanciones) => {
        if (err) {
          console.error('Error al actualizar las sanciones:', err);
          res.status(500).json({ error: 'Error al actualizar las sanciones' });
          return;
        }

        if (resultSanciones.affectedRows === 0) {
          res.status(404).json({ error: 'Sancion no encontrada' });
          return;
        }

        res.json({ mensaje: 'Sancion actualizada correctamente' });
      });
    });
  });
};



module.exports = {
    listarSancionesUp,
    actualizarSancion
}