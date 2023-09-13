const conexion = require('../../db/conexion');
const response = require('express')

const listBooks = (req, res = response) => {
    const sql = 'SELECT libros.idLibro, categoriaslibros.categoria, libros.isbn, libros.titulo, libros.ilustracion, libros.autor, libros.ciudad, libros.impresion, libros.editorial, libros.disponibles FROM libros INNER JOIN categoriaslibros ON libros.idCategoriaLibro = categoriaslibros.idCategoriaLibro';   
    conexion.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener los libros:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            res.status(200).json(data);
        }
    });
};

const listBook = (req, res = response) => {
    const idLibro = req.params.id;
    const sql = 'SELECT libros.idLibro, categoriaslibros.categoria, libros.isbn, libros.titulo, libros.ilustracion, libros.autor, libros.ciudad, libros.impresion, libros.editorial, libros.disponibles FROM libros INNER JOIN categoriaslibros ON libros.idCategoriaLibro = categoriaslibros.idCategoriaLibro WHERE libros.idLibro = ?;';
    const values = [idLibro];

    conexion.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error al obtener el libro:', err);
            res.status(500).json({ msg: 'Error interno del servidor' });
        } else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Libro no encontrado' });
            } else {
                res.status(200).json(data[0]);
            }
        }
    });
};

module.exports = {
    listBooks,
    listBook,
}