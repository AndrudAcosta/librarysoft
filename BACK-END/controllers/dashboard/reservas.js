const conexion = require('../../db/conexion');
const response = require('express')


const getYearsReservas = async (req, res = response) => {
    const query = 'SELECT DISTINCT YEAR(fechaReserva) AS year FROM reservas';
    
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


const getFetchReservas = async (req, res) => {
    const year = req.params.year;
    const query = `
    SELECT MONTH(fechaReserva) AS month, COUNT(*) AS count FROM reservas WHERE YEAR(fechaReserva) = ? GROUP BY month;`;


    conexion.query(query, [year], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err.message);
        res.status(500).json({ error: 'Error en el servidor' });
      } else {
        res.json(results);
      }
    });
};




module.exports = { getYearsReservas, getFetchReservas};