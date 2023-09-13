const conexion = require('../../db/conexion');
const response = require('express');

//METODO GET PARA LISTAR EN EL FORMULARIO ROLES 
const listarRolesup = (req, res = response) => {
  const id = req.params.idRol;
  const sql = `SELECT r.idRol, r.nombreRol, r.plazo, r.cantidadl, r.cantidadp, p.idModulo, m.modulo
               FROM roles AS r
               LEFT JOIN permisos AS p ON r.idRol = p.idRol
               LEFT JOIN modulos AS m ON p.idModulo = m.idModulo
               WHERE r.idRol = ?;`;

  conexion.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error al obtener el rol:', err);
      res.status(500).json({ error: 'Error al obtener el rol' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ error: 'Rol no encontrado' });
      return;
    }

    const rol = {
      idRol: data[0].idRol,
      nombreRol: data[0].nombreRol,
      plazo: data[0].plazo,
      cantidadl: data[0].cantidadl,
      cantidadp: data[0].cantidadp,
      modulos: []
    };

    data.forEach((row) => {
      if (row.idModulo) {
        rol.modulos.push({
          idModulo: row.idModulo,
          modulo: row.modulo
        });
      }
    });

    res.json(rol);
  });
};


// METODO PUT para actualizar los datos de un beneficiario y usuario específico

const actualizarRol = (req, res = response) => {
  const idRol = req.params.idRol;
  const { nombreRol, plazo, cantidadl, cantidadp, agregarModulos, eliminarModulos } = req.body;

  // Verificar si el nombre ya existe
  const sqlVerificarNombre = `SELECT COUNT(*) AS count FROM roles WHERE nombreRol = ? AND idRol <> ?;`;

  conexion.query(sqlVerificarNombre, [nombreRol, idRol], (err, resultoNombre) => {
    if (err) {
      console.error('Error al verificar el nombre:', err);
      res.status(500).json({ error: 'Error al verificar el nombre' });
      return;
    }

    const nombreExiste = resultoNombre[0].count > 0;

    if (nombreExiste) {
      res.status(400).json({ error: 'El nombre ya existe' });
      return;
    }

    // Convertir campos vacíos o 0 a null
    const plazoValue = plazo === '' || plazo === 0 ? null : plazo;
    const cantidadlValue = cantidadl === '' || cantidadl === 0 ? null : cantidadl;
    const cantidadpValue = cantidadp === '' || cantidadp === 0 ? null : cantidadp;

    // Actualizar datos en la tabla roles
    const sqlRoles = `
      UPDATE roles
      SET nombreRol = ?, plazo = ?, cantidadl = ?, cantidadp = ?
      WHERE idRol = ?;
    `;

    conexion.query(sqlRoles, [nombreRol, plazoValue, cantidadlValue, cantidadpValue, idRol], (err, resultRoles) => {
      if (err) {
        console.error('Error al actualizar el rol:', err);
        res.status(500).json({ error: 'Error al actualizar el rol' });
        return;
      }

      // Actualizar permisos (agregarModulos)
      if (agregarModulos && agregarModulos.length > 0) {
        const sqlAgregarModulos = `
          INSERT INTO permisos (idRol, idModulo)
          VALUES ?
          ON DUPLICATE KEY UPDATE idRol = idRol;
        `;
        const valoresAgregarModulos = agregarModulos.map((idModulo) => [idRol, idModulo]);

        conexion.query(sqlAgregarModulos, [valoresAgregarModulos], (err, resultAgregarModulos) => {
          if (err) {
            console.error('Error al actualizar los permisos (agregarModulos):', err);
            res.status(500).json({ error: 'Error al actualizar los permisos (agregarModulos)' });
            return;
          }
        });
      }

      // Eliminar permisos (eliminarModulos)
      if (eliminarModulos && eliminarModulos.length > 0) {
        const sqlEliminarModulos = `
          DELETE FROM permisos
          WHERE idRol = ? AND idModulo IN (?);
        `;

        conexion.query(sqlEliminarModulos, [idRol, eliminarModulos], (err, resultEliminarModulos) => {
          if (err) {
            console.error('Error al eliminar los permisos (eliminarModulos):', err);
            res.status(500).json({ error: 'Error al eliminar los permisos (eliminarModulos)' });
            return;
          }
        });
      }

      res.json({ mensaje: 'Rol actualizado correctamente' });
    });
  });
};



const cambioEstado = (req, res) => {
  const idRol = req.body.idRol;
  const nuevoEstado = req.body.estado;

  if (!nuevoEstado) {
    // Consulta SQL para verificar si hay usuarios asociados al rol
    const sqlUsuariosAsociados = `SELECT COUNT(*) AS total FROM usuarios WHERE idRol = ${idRol}`;

    // Realizar la consulta para verificar si hay usuarios asociados al rol
    conexion.query(sqlUsuariosAsociados, (errUsuariosAsociados, resultUsuariosAsociados) => {
      if (errUsuariosAsociados) {
        console.error('Error al verificar los usuarios asociados:', errUsuariosAsociados);
        res.status(500).json({ error: 'Error al actualizar el estado' });
        return;
      }

      const usuariosAsociados = resultUsuariosAsociados[0].total > 0;

      if (usuariosAsociados) {
        res.json({ success: false, usuariosAsociados: true });
      } else {
        // Consulta SQL para actualizar el campo 'estado' en la tabla 'roles'
        const sqlRoles = `UPDATE roles SET estado = ${nuevoEstado ? 1 : 0} WHERE idRol = ${idRol}`;

        // Realizar la consulta de actualización del estado del rol
        conexion.query(sqlRoles, (errRoles, resultRoles) => {
          if (errRoles) {
            console.error('Error al actualizar el estado en la tabla roles:', errRoles);
            res.status(500).json({ error: 'Error al actualizar el estado' });
            return;
          }

          res.json({ success: true, usuariosAsociados: false });
        });
      }
    });
  } else {
    // Si se está activando el rol, actualizar el estado sin validación previa
    const sqlRoles = `UPDATE roles SET estado = ${nuevoEstado ? 1 : 0} WHERE idRol = ${idRol}`;

    conexion.query(sqlRoles, (errRoles, resultRoles) => {
      if (errRoles) {
        console.error('Error al actualizar el estado en la tabla roles:', errRoles);
        res.status(500).json({ error: 'Error al actualizar el estado' });
        return;
      }

      res.json({ success: true, usuariosAsociados: false });
    });
  }
};

const validarEstado = (req, res) => {
  const idRol = req.body.idRol;
  const nuevoEstado = req.body.estado;

  // Consulta SQL para verificar si hay usuarios asociados al rol
  const sqlUsuariosAsociados = `SELECT COUNT(*) AS total FROM usuarios WHERE idRol = ${idRol}`;

  // Realizar la consulta para verificar si hay usuarios asociados al rol
  conexion.query(sqlUsuariosAsociados, (errUsuariosAsociados, resultUsuariosAsociados) => {
    if (errUsuariosAsociados) {
      console.error('Error al verificar los usuarios asociados:', errUsuariosAsociados);
      res.status(500).json({ error: 'Error al validar el estado' });
      return;
    }

    const usuariosAsociados = resultUsuariosAsociados[0].total > 0;

    res.json({ success: true, usuariosAsociados: usuariosAsociados });
  });
};



module.exports = {
  cambioEstado,
  listarRolesup,
  actualizarRol,
  validarEstado
};
