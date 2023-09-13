const conexion = require('../../../db/conexion');
const response = require('express')

const updateStateCopy = (req, res = response) => {
    const idEjemplar = req.params.idEjemplar;

    // Construir la consulta SQL de actualización
    const sql = 'UPDATE ejemplares SET disponibilidad = NOT disponibilidad WHERE idEjemplar = ?';
    // Ejecutar la consulta de actualización
    conexion.query(sql,idEjemplar, (err, result) => {
      if (err) {
        console.error('Error al actualizar el estado del ejemplar:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Libro actualizado correctamente' });
          console.log('El cambio de estado se ha realizado perfectamente')
        }
      }
    });
  };

  const listAllCopiesStates = (req, res=response) => {
    const sql = `SELECT * FROM estadoejemplar`;
    
    conexion.query(sql, (err, data) => {
    if (err) {
        console.error('Error al obtener los estados:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
        res.status(200).json(data);
    }
    });
  };

  const updateCopy = (req, res = response) => {
    const { idEjemplar,idEstadoEjemplar, ejemplar,disponibilidad, descripcion } = req.body;
  
    // Verificar que el id del libro esté presente
    if (!idEjemplar) {
      res.status(400).json({ msg: 'Se requiere el id del libro' });
      return;
    }
  
    // Construir la consulta SQL de actualización
    const sql = 'UPDATE ejemplares SET idEstadoEjemplar = ?, ejemplar = ?, descripcion = ?,  disponibilidad = ? WHERE idEjemplar = ?';
    const values = [idEstadoEjemplar, ejemplar, descripcion,disponibilidad,idEjemplar];
  
    // Ejecutar la consulta de actualización
    conexion.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.error('Error: Entrada duplicada en la base de datos al actualizar');
          res.status(400).json({ msg: 'Entrada duplicada al actualizar' });
        } else {
          console.error('Error al agregar el Ejemplar:', err);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Ejemplar actualizado correctamente' });
        } else {
          res.status(404).json({ msg: 'Ejemplar no encontrado' });
        }
      }
    });
  };
  
  const validationCopieUpdate = (req, res) => {
    const { ejemplar,idLibro,idEjemplar} = req.body;
  
    const sqlVerificarDatos = 'SELECT COUNT(*) AS count FROM ejemplares WHERE ejemplar = ? AND idLibro = ? AND idEjemplar <> ?';
    const values = [ejemplar,idLibro,idEjemplar];
  
    conexion.query(sqlVerificarDatos, values, (err, result) => {
      if (err) {
        console.error('Error al verificar los datos:', err);
        res.status(500).json({ msg:'Error al verificar los datos'});
        return;
      }
  
      const count = result[0].count;
  
      if (count > 0) {
        res.status(400).json({ msg:'El ejemplar ya esta registrado' });
      } else {
        res.json({ msg: 'El ejemplar no esta registrado'});
      }
    });
  };

module.exports = {
    updateStateCopy,
    listAllCopiesStates,
    updateCopy,
    validationCopieUpdate
} 