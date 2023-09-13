const conexion = require('../../db/conexion');
const response = require('express')


//METODO GET PARA LISTAR LOS ROLES EN EL SELECT DEL FORMULARIO DE REGISTRO DE USUARIOS
  const obtenerRoles= (req, res=response) => {
    const sql = 'SELECT * FROM roles WHERE estado = 1';

    conexion.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener los roles:', err);
        res.status(500).json({ error: 'Error al obtener los roles' });
        return;
      }

      res.json({ roles: data });
    });
  };


//METODO GET PARA LISTAR LOS BENEFICIARIOS
const listarBeneficiarios = (req, res = response) => {
  // Modifica la consulta SQL para incluir la búsqueda por correo y documento
  const sql = `SELECT r.nombreRol, u.documento, u.estado, b.idBeneficiario, b.nombres, b.apellidos, b.correo, b.grado, b.grupo FROM roles r INNER JOIN usuarios u ON r.idRol = u.idRol INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario;`;

  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los beneficiarios:', err);
      res.status(500).json({ error: 'Error al obtener los beneficiarios' });
      return;
    }
    res.json({ beneficiarios: data });
  });
};


const listadoBeneficiarios = (req, res=response) => {
  const sql = `SELECT r.nombreRol, b.nombres, b.apellidos, b.grado, b.grupo FROM roles r INNER JOIN usuarios u ON r.idRol = u.idRol INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario;`;
  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los beneficiarios:', err);
      res.status(500).json({ error: 'Error al obtener los beneficiarios' });
      return;
    }
    res.json({ infoBeneficiarios: data });
  });
};


module.exports = {
    listarBeneficiarios,
    listadoBeneficiarios,
    obtenerRoles,
} 