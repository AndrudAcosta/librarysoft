const conexion = require('../../db/conexion');
const response = require('express')


//METODO GET PARA LISTAR EN EL FORMULARIO DE EDITAR LOS BENEFICIARIOS Y  USUARIOS 
const verSanciones = (req, res = response) => {
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

module.exports = {
    verSanciones
}