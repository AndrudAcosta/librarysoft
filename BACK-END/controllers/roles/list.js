const conexion = require('../../db/conexion');
const response = require('express')


//METODO GET PARA LISTAR LOS MODULOS EN EL CHECK DEL FORMULARIO DE REGISTRO DE ROLES
  const obtenerModulos= (req, res=response) => {
    const sql = 'SELECT * FROM modulos';

    conexion.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener los modulos:', err);
        res.status(500).json({ error: 'Error al obtener los modulos' });
        return;
      }

      res.json({ modulos: data });
    });
  };


//METODO GET PARA LISTAR LOS ROLES
const listarRoles = (req, res = response) => {
  const filtro = req.query.filtro || ''; // Obtén el valor del parámetro de consulta "filtro"
  
  // Modifica la consulta SQL para incluir la búsqueda por correo y documento
  const sql = `SELECT r.idRol, r.nombreRol, r.estado, r.plazo, r.cantidadl, r.cantidadp FROM roles r WHERE r.nombreRol LIKE '%${filtro}%' OR r.estado LIKE '%${filtro}%';`;


  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los roles:', err);
      res.status(500).json({ error: 'Error al obtener los roles' });
      return;
    }

    res.json({ roles: data });
  });
};



module.exports = {
    obtenerModulos,
    listarRoles
} 