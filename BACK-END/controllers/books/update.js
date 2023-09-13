const conexion = require('../../db/conexion');
const response = require('express')

const updateBook = (req, res = response) => {
    const { idLibro, idCategoriaLibro, isbn, titulo, ilustracion, autor, ciudad, impresion, editorial, disponibles } = req.body;
  
    // Verificar que el id del libro esté presente
    if (!idLibro) {
      res.status(400).json({ msg: 'Se requiere el id del libro' });
      return;
    }
  
    // Construir la consulta SQL de actualización
    const sql = 'UPDATE libros SET idCategoriaLibro = ?, isbn = ?, titulo = ?, ilustracion = ?, autor = ?, ciudad = ?, impresion = ?, editorial = ?, disponibles = ? WHERE idLibro = ?';
    const values = [idCategoriaLibro, isbn, titulo, ilustracion, autor, ciudad, impresion, editorial, disponibles, idLibro];
  
    // Ejecutar la consulta de actualización
    conexion.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el libro:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Libro actualizado correctamente' });
          
        } else {
          res.status(404).json({ msg: 'Libro no encontrado' });
        }
      }
    });
  };

  const validationTitleIsbnUpdate = (req, res) => {
    const { isbn, titulo,idLibro} = req.body;
  
    const sqlVerificarDatos = 'SELECT COUNT(*) AS count FROM libros WHERE (isbn = ? OR titulo = ?) AND idLibro <> ?';
    const values = [isbn, titulo,idLibro];
  
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
        res.json({ msg: 'El ISBN o el TITULO no están registrados'});
      }
    });
  };

  const validationTitleIsbnAdd = (req, res) => {
    const { isbn, titulo} = req.body;
  
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
        res.json({ msg: 'El ISBN o el TITULO no están registrados'});
      }
    });
  };

module.exports = {
    updateBook,
    validationTitleIsbnUpdate,
    validationTitleIsbnAdd
} 