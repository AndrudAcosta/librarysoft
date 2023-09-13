const conexion = require('../../../db/conexion');
const response = require('express')

const listCategory = (req, res=response) => {
    const sql = 'SELECT * FROM categoriaslibros';
    
    conexion.query(sql, (err, data) => {
    if (err) {
        console.error('Error al obtener las categorias:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
        res.status(200).json(data);
    }
    });
};

module.exports = {
    listCategory,
}