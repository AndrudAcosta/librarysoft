const conexion = require('../../db/conexion');

const agregarRol = async (req, res) => {
  const { nombreRol, modulos, plazo, libros, prestamos } = req.body;

  try {
    // Convertir valores vacíos o 0 a NULL
    const plazoFinal = plazo !== '' ? (plazo !== 0 ? plazo : null) : null;
    const librosFinal = libros !== '' ? (libros !== 0 ? libros : null) : null;
    const prestamosFinal = prestamos !== '' ? (prestamos !== 0 ? prestamos : null) : null;

    // Insertar el nombreRol y el estado en la tabla roles
    const sqlRoles = 'INSERT INTO roles (nombreRol, plazo, cantidadl, cantidadp) VALUES (?,?,?,?)';
    const valuesRoles = [nombreRol, plazoFinal, librosFinal, prestamosFinal];

    conexion.query(sqlRoles, valuesRoles, async (err, resultRoles) => {
      if (err) {
        console.error('Error al guardar el rol:', err);
        res.status(500).json({ error: 'Error al guardar el rol' });
        return;
      }

      const idRol = resultRoles.insertId;

      // Guardar las claves foráneas idRol y idModulo en la tabla permisos
      const sqlPermisos = 'INSERT INTO permisos (idRol, idModulo) VALUES (?, ?)';

      try {
        for (const idModulo of modulos) {
          await conexion.query(sqlPermisos, [idRol, idModulo]);
        }
        res.sendStatus(200);
      } catch (error) {
        console.error('Error al guardar los permisos:', error);
        res.status(500).json({ error: 'Error al guardar los permisos' });
      }
    });
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    res.status(500).json({ error: 'Error al guardar el rol' });
  }
};




const validarCD = (req, res) => {
  const { nombreRol } = req.body;

  // Verificar si el nombreRol ya existe en la tabla roles
  const sqlVerificarNombre = 'SELECT COUNT(*) AS count FROM roles WHERE nombreRol = ?';
  const valuesVerificarNombre = [nombreRol];

  conexion.query(sqlVerificarNombre, valuesVerificarNombre, async (err, resultVerificarNombre) => {
    if (err) {
      console.error('Error al verificar el nombre:', err);
      res.status(500).json({ data: { error: 'Error al verificar el nombre' } });
      return;
    }

    const nombreExistente = resultVerificarNombre[0].count > 0;

    if (nombreExistente) {
      res.status(400).json({ data: { error: 'El nombre ya está registrado' } });
    } else {
      res.json({ data: { nombreExistente } });
    }
  });
};

module.exports = {
  agregarRol,
  validarCD
};