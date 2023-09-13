const conexion = require('../../db/conexion');
const response = require('express')


//METODO GET PARA LISTAR EN EL FORMULARIO DE EDITAR LOS BENEFICIARIOS Y  USUARIOS 
const listarBeneficiariosup = (req, res = response) => {
  const id = req.params.idBeneficiario;
  const sql = `
    SELECT u.idUsuario, r.nombreRol, u.documento, b.idBeneficiario, b.nombres, b.apellidos, b.correo, b.grado, b.grupo
    FROM roles r
    INNER JOIN usuarios u ON r.idRol = u.idRol
    INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario
    WHERE b.idBeneficiario = ?;
  `;

  conexion.query(sql, [id], (err, data) => {
    if (err) {
      console.error('Error al obtener el beneficiario:', err);
      res.status(500).json({ error: 'Error al obtener el beneficiario' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ error: 'Beneficiario no encontrado' });
      return;
    }

    const beneficiario = data[0];
    const nombreRol = beneficiario.nombreRol;
    const documento = beneficiario.documento;
    const nombres = beneficiario.nombres;
    const apellidos = beneficiario.apellidos;
    const correo = beneficiario.correo;
    const grado = beneficiario.grado;
    const grupo = beneficiario.grupo;


    res.json(beneficiario );
  });
};


//METODO GET PARA OBETENER LOS ID DE LOS USUARIOS 
const listarIdUsuarios = (req, res = response) => {
  const sql = 'SELECT idUsuario FROM usuarios';

  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los ID de usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los ID de usuarios' });
      return;
    }

    const idUsuarios = data.map(usuario => usuario.idUsuario);
    res.json({ usuarios: idUsuarios });
  });
};





// METODO PUT para actualizar los datos de un beneficiario y usuario específico
const actualizarBeneficiario = (req, res = response) => {
  const idBeneficiario = req.params.idBeneficiario;
  const { nombres, apellidos, correo, grado, grupo, documento, nombreRol } = req.body;

  if (nombreRol === "Estudiante" && (grado === null || grupo === null)) {
    res.status(400).json({ error: "Debe proporcionar el grado y el grupo para estudiantes." });
    return;
  }



  // Verificar si el documento ya existe
  const sqlVerificarDocumento = `
  SELECT COUNT(*) AS count
  FROM usuarios
  JOIN beneficiarios ON usuarios.idUsuario = beneficiarios.idUsuario
  WHERE usuarios.documento = ? AND beneficiarios.idBeneficiario != ?;
`;

  conexion.query(sqlVerificarDocumento, [documento, idBeneficiario], (err, resultDocumento) => {
    if (err) {
      console.error('Error al verificar el documento:', err);
      res.status(500).json({ error: 'Error al verificar el documento' });
      return;
    }

    const documentoExistente = resultDocumento[0].count > 0;

    if (documentoExistente) {
      res.status(400).json({ error: 'El documento ya existe.' });
      return;
    }

    // Verificar si el correo electrónico ya existe
    const sqlVerificarCorreo = `
    SELECT COUNT(*) AS count
    FROM beneficiarios
    WHERE correo = ? AND idBeneficiario != ?;
  `;

    conexion.query(sqlVerificarCorreo, [correo, idBeneficiario], (err, resultCorreo) => {
      if (err) {
        console.error('Error al verificar el correo electrónico:', err);
        res.status(500).json({ error: 'Error al verificar el correo electrónico' });
        return;
      }

      const correoExistente = resultCorreo[0].count > 0;

      if (correoExistente) {
        res.status(400).json({ error: 'El correo electrónico ya existe.' });
        return;
      } 
      
      // Obtener el idRol correspondiente al nombreRol
      const sqlObtenerIdRol = `
        SELECT idRol
        FROM roles
        WHERE nombreRol = ?;
      `;

      conexion.query(sqlObtenerIdRol, [nombreRol], (err, dataRoles) => {
        if (err) {
          console.error('Error al obtener el idRol:', err);
          res.status(500).json({ error: 'Error al obtener el idRol' });
          return;
        }

        if (dataRoles.length === 0) {
          res.status(404).json({ error: 'Rol no encontrado' });
          return;
        }

      

        const idRol = dataRoles[0].idRol;

        // Actualizar datos en la tabla beneficiarios
        const sqlBeneficiarios = `
          UPDATE beneficiarios
          SET nombres = ?, apellidos = ?, correo = ?, grado = ?, grupo = ?
          WHERE idBeneficiario = ?;
        `;

        conexion.query(sqlBeneficiarios, [nombres, apellidos, correo, grado, grupo, idBeneficiario], (err, resultBeneficiarios) => {
          if (err) {
            console.error('Error al actualizar el beneficiario:', err);
            res.status(500).json({ error: 'Error al actualizar el beneficiario' });
            return;
          }

          if (resultBeneficiarios.affectedRows === 0) {
            res.status(404).json({ error: 'Beneficiario no encontrado' });
            return;
          }

          // Obtener el idUsuario de la tabla beneficiarios
          const sqlObtenerIdUsuario = `
            SELECT idUsuario
            FROM beneficiarios
            WHERE idBeneficiario = ?;
          `;

          conexion.query(sqlObtenerIdUsuario, [idBeneficiario], (err, resultIdUsuario) => {
            if (err) {
              console.error('Error al obtener el idUsuario:', err);
              res.status(500).json({ error: 'Error al obtener el idUsuario' });
              return;
            }

            if (resultIdUsuario.length === 0) {
              res.status(404).json({ error: 'Beneficiario no encontrado' });
              return;
            }

            const idUsuario = resultIdUsuario[0].idUsuario;

            // Actualizar datos en la tabla usuarios
            const sqlUsuarios = `
              UPDATE usuarios
              SET idRol = ?, documento = ?
              WHERE idUsuario = ?;
            `;

            conexion.query(sqlUsuarios, [idRol, documento, idUsuario], (err, resultUsuarios) => {
              if (err) {
                console.error('Error al actualizar el usuario:', err);
                res.status(500).json({ error: 'Error al actualizar el usuario' });
                return;
              }

              if (resultUsuarios.affectedRows === 0) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
              }

              res.json({ mensaje: 'Beneficiario y usuario actualizados correctamente' });
            });
          });
        });
      });
    });
  });
};


const cambiodeEstado = (req, res) => {
  const idBeneficiario = req.body.idBeneficiario;
  const nuevoEstado = req.body.estado;

  // Consulta SQL para actualizar el campo 'estado' en la tabla 'usuarios'
  const sqlUsuarios = `UPDATE usuarios SET estado = ${nuevoEstado ? 1 : 0} WHERE idUsuario = (SELECT idUsuario FROM beneficiarios WHERE idBeneficiario = ${idBeneficiario})`;

  // Realizar la consulta
  conexion.query(sqlUsuarios, (errUsuarios, resultUsuarios) => {
    if (errUsuarios) {
      console.error('Error al actualizar el estado en la tabla usuarios:', errUsuarios);
      res.status(500).json({ error: 'Error al actualizar el estado' });
      return;
    }

    res.json({ success: true });
  });
};



const validarEstado = (req, res) => {
  const idBeneficiario = req.body.idBeneficiario;

  // Consulta SQL para determinar si el usuario tiene sanciones activas o préstamos activos
  const sqlAccionesActivas = `
    SELECT EXISTS (
      SELECT 1
      FROM beneficiarios b
      LEFT JOIN sanciones s ON b.idBeneficiario = s.idBeneficiario AND s.idEsancion = 1
      LEFT JOIN prestamos p ON b.idBeneficiario = p.idBeneficiario AND p.estadoPrestamo = 1
      WHERE b.idBeneficiario = ${idBeneficiario} AND (s.idEsancion IS NOT NULL OR p.estadoPrestamo IS NOT NULL)
    ) AS tieneAccionesActivas;
  `;

  // Realizar la consulta para verificar sanciones activas o préstamos activos
  conexion.query(sqlAccionesActivas, (errAcciones, resultAcciones) => {
    if (errAcciones) {
      console.error('Error al verificar acciones activas:', errAcciones);
      res.status(500).json({ error: 'Error al verificar acciones activas' });
      return;
    }

    // Comprobar si el usuario tiene acciones activas y enviar la respuesta correspondiente
    if (resultAcciones[0].tieneAccionesActivas === 1) {
      res.json({ message: 'Este usuario tiene acciones activas' });
    } else {
      res.json({ message: 'El estado del usuario se actualizó exitosamente' });
    }
  });
};





module.exports = {
  listarBeneficiariosup,
  listarIdUsuarios,
  actualizarBeneficiario,
  cambiodeEstado, 
  validarEstado
} 

