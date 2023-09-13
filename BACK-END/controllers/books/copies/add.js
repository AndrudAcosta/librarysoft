const conexion = require('../../../db/conexion');           
const response = require('express')

const listStateCopy = (req, res=response) => {
    const sql = 'SELECT * FROM estadoejemplar WHERE estadoEjemplar IN ("Buen estado", "Regular");';
    
    conexion.query(sql, (err, data) => {
    if (err) {
        console.error('Error al obtener los estados:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
        res.status(200).json(data);
    }
    });
};


const addCopy = (req, res = response) => {
    const {idEstadoEjemplar, idLibro, ejemplar, descripcion} = req.body;
  
    // Verificar que todos los campos requeridos estén presentes
    const sql = 'INSERT INTO ejemplares (idEstadoEjemplar, idLibro, ejemplar, descripcion) VALUES (?, ?, ?, ?)';
    const values = [idEstadoEjemplar, idLibro, ejemplar, descripcion];
  
    try {
      conexion.query(sql, values, (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.error('Error: Entrada duplicada en la base de datos');
            res.status(400).json({ msg: 'Entrada duplicada' });
          } else {
            console.error('Error al agregar el Ejemplar:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
          }
        } else {
          res.status(201).json({ msg: 'Ejemplar agregado correctamente' });
        }
      });
    } catch (error) {
      console.error('Error en la ejecución de la consulta:', error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const validationCopieAdd = (req, res) => {
  const { ejemplar,idLibro} = req.body;

  const sqlVerificarDatos = 'SELECT COUNT(*) AS count FROM ejemplares WHERE ejemplar = ? AND idLibro = ?';
  const values = [ejemplar,idLibro];

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
  addCopy,
  listStateCopy,
  validationCopieAdd
} 
