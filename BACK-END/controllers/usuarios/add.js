const conexion = require('../../db/conexion');
const bcrypt = require('bcrypt');

//METODO POST DE AGREGAR BENEFICIARIOS 
const agregarBeneficiarios = async (req, res) => {
  const { documento, nombres, apellidos, correo, grado, grupo, nombreRol } = req.body;

  try {
    const password = documento;
    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Obtener el idRol según el nombreRol
    const sqlObtenerRol = 'SELECT idRol FROM roles WHERE nombreRol = ?';
    const valuesObtenerRol = [nombreRol];

    conexion.query(sqlObtenerRol, valuesObtenerRol, async (err, resultObtenerRol) => {
      if (err) {
        console.error('Error al obtener el idRol:', err);
        res.status(500).json({ error: 'Error al obtener el idRol' });
        return;
      }

      if (!resultObtenerRol || resultObtenerRol.length === 0 || !resultObtenerRol[0].idRol) {
        console.error('No se pudo obtener el idRol');
        res.status(400).json({ error: 'No se pudo obtener el idRol' });
        return;
      }

      const idRol = resultObtenerRol[0].idRol;

      // Insertar el documento, contraseña y idRol en la tabla usuarios
      const sqlUsuarios = 'INSERT INTO usuarios (idRol, documento, password) VALUES (?, ?, ?)';
      const valuesUsuarios = [idRol, documento, hashedPassword];

      conexion.query(sqlUsuarios, valuesUsuarios, async (err, resultUsuarios) => {
        if (err) {
          console.error('Error al guardar el usuario:', err);
          res.status(500).json({ error: 'Error al guardar el usuario' });
          return;
        }

        const idUsuario = resultUsuarios.insertId;

        // Guardar los demás campos en la tabla beneficiarios junto con la clave foránea idUsuario
        const sqlBeneficiarios = 'INSERT INTO beneficiarios (idUsuario, nombres, apellidos, correo, grado, grupo) VALUES (?, ?, ?, ?, ?, ?)';
        let valuesBeneficiarios = [idUsuario, nombres, apellidos, correo];

        // Verificar si se proporcionaron los campos grado y grupo
        if (grado && grupo) {
          valuesBeneficiarios = [...valuesBeneficiarios, grado, grupo];
        } else {
          valuesBeneficiarios = [...valuesBeneficiarios, null, null];
        }

        conexion.query(sqlBeneficiarios, valuesBeneficiarios, (err, resultBeneficiarios) => {
          if (err) {
            console.error('Error al guardar los beneficiarios:', err);
            res.status(500).json({ error: 'Error al guardar los beneficiarios' });
            return;
          }

          // console.error('Usuario y beneficiario guardados exitosamente');
          const rutaadd = 'admin/usuarios.php'
          res.json({ rutaadd });
          
        });
      });
    });
  } catch (error) {
    console.error('Error al guardar los beneficiarios: ', error);
    throw error;
  }
}


const validarCD = (req, res) => {
  const { documento, correo } = req.body;

  // Verificar si el correo ya existe en la tabla beneficiarios
  const sqlVerificarCorreo = 'SELECT COUNT(*) AS count FROM beneficiarios WHERE correo = ?';
  const valuesVerificarCorreo = [correo];

  conexion.query(sqlVerificarCorreo, valuesVerificarCorreo, async (err, resultVerificarCorreo) => {
    if (err) {
      console.error('Error al verificar el correo:', err);
      res.status(500).json({ data: { error: 'Error al verificar el correo' } });
      return;
    }

    const correoExistente = resultVerificarCorreo[0].count > 0;

      // Verificar si el documento ya existe en la tabla usuarios
      const sqlVerificarDocumento = 'SELECT COUNT(*) AS count FROM usuarios WHERE documento = ?';
      const valuesVerificarDocumento = [documento];

      conexion.query(sqlVerificarDocumento, valuesVerificarDocumento, async (err, resultVerificarDocumento) => {
        if (err) {
          console.error('Error al verificar el documento:', err);
          res.status(500).json({ data: { error: 'Error al verificar el documento' } });
          return;
        }

        const documentoExistente = resultVerificarDocumento[0].count > 0;

        if (correoExistente && documentoExistente) {
          res.status(400).json({ data: { error: 'El correo y el documento ya están registrados' } });
        } else if (correoExistente) {
          res.status(400).json({ data: { error: 'El correo ya está registrado' } });
        } else if (documentoExistente) {
          res.status(400).json({ data: { error: 'El documento ya está registrado' } });
        } else {
          res.json({ data: { documentoExistente, correoExistente } });
        }
    });
  });
};


module.exports = {
    agregarBeneficiarios,
    validarCD
}