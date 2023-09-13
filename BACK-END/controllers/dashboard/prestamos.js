const conexion = require('../../db/conexion');
const response = require('express')


const getFetchPrestamos = (req, res = response)  => {
    const year = req.params.year;
    const query = `
      SELECT MONTH(fechaInicio) AS month, COUNT(*) AS count
      FROM prestamos
      WHERE YEAR(fechaInicio) = ?
      GROUP BY month
      ORDER BY month;
    `;
  
    conexion.query(query, [year], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err.message);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.json(results);
      }
    });
  };


  // En tu controlador API
  const getYear = (req, res = response) => {
    const query = 'SELECT DISTINCT YEAR(fechaInicio) AS year FROM prestamos';
  
    conexion.query(query, (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        const years = results.map(result => result.year);
        res.json(years);
      }
    });
  };

  

module.exports = { getFetchPrestamos, getYear};