const conexion = require('../../db/conexion');
const response = require('express')

const addBook = (req, res = response) => {
  const {idCategoriaLibro, isbn, titulo, ilustracion, autor, ciudad, impresion, editorial } = req.body;
  // Verificar que todos los campos requeridos estén presentes
  const sql = 'INSERT INTO libros (idCategoriaLibro, isbn, titulo, ilustracion, autor, ciudad, impresion, editorial) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [idCategoriaLibro, isbn, titulo, ilustracion, autor, ciudad, impresion, editorial];

  conexion.query(sql, values, (err) => {
    
    if (err) {
      console.error('Error al agregar el libro:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
      res.status(201).json({ msg: 'Libro agregado correctamente' });
    }
  });
};

const validationTitleIsbn = (req, res) => {
  const { isbn, titulo } = req.body;

  const sqlVerificarDatos = 'SELECT COUNT(*) AS count FROM libros WHERE isbn = ? OR titulo = ?';
  const values = [isbn, titulo];

  conexion.query(sqlVerificarDatos, values, (err, result) => {
    if (err) {
      console.error('Error al verificar los datos:', err);
      res.status(500).json({ msg:'Error al verificar los datos'});
      return;
    }

    const count = result[0].count;

    if (count > 0) {
      res.status(400).json({ msg:'El ISBN o el TITULO ya están registrados' });
    } else {
      res.json({ msg: count > 0  });
    }
  });
};

module.exports = {
  addBook,
  validationTitleIsbn
} 

