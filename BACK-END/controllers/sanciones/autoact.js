const cron = require('node-cron');
const conexion = require('../../db/conexion');

// Configurar el planificador para que se ejecute cada 30 segundos
cron.schedule('0 0 * * *', () => {
    ActualizarEstadoSancion();
  });
  
  module.exports = ActualizarEstadoSancion;
  
  
  
  function ActualizarEstadoSancion() {
    const todays = new Date();
    todays.setHours(0, 0, 0, 0);

    const yesterdays = new Date(todays);
    yesterdays.setDate(yesterdays.getDate() - 1);
    const formattedYesterdays = yesterdays.toISOString().split('T')[0];
    
    const querys = `SELECT * FROM sanciones WHERE fechaCierre = "${formattedYesterdays}"`;

    conexion.query(querys, (err, results) => {
      if (err) {
        console.error('Error al obtener las sanciones desde la base de datos:', err);
        return;
      }
      const sanciones = results;
      sanciones.forEach((sancion) => {
        actualizarEstado(sancion.idSancion);
      });
    });
  }
  
  function actualizarEstado(idSancion) {
    const idEsancion = 2;
  
    const queryss = `UPDATE sanciones SET idEsancion = ${idEsancion} WHERE idSancion = ${idSancion}`;
  
    conexion.query(queryss, (err, results) => {
      if (err) {
        console.error('Error al actualizar la sanción en la base de datos:', err);
        return;
      }
    });
  }