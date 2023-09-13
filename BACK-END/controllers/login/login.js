const conexion = require('../../db/conexion');
const response = require('express')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const getUsuario = (req, res = response) => {
  conexion.query("SELECT * FROM usuarios", (error, data) => {
    if (error) {
      throw error
    }
    res.json({
      mensaje: 'Result all usuarios',
      data
    })
  })
}



const postUsuario = (req, res) => {
  const { documento, password } = req.body;

  // Verificar las credenciales del usuario en la base de datos
  conexion.query(
    'SELECT u.documento, u.password, u.estado,  b.nombres, b.apellidos, u.idRol FROM usuarios u JOIN beneficiarios b ON u.idUsuario  = b.idUsuario WHERE u.documento = ?',
    [documento],
    (error, data) => {
      if (error) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }

      if (data.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }

      const user = data[0];
      if (user.estado === 0) {
        return res.status(403).json({ error: 'Usuario desactivado. No tiene acceso.' });
      }
      // Verificar la contraseña encriptada
      bcrypt.compare(password.toString(), user.password, (error, isMatch) => {
        if (error) {
          return res.status(500).json({ error: 'Error en la verificación de la contraseña' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Obtener el rol y los permisos del usuario
        conexion.query(
          'SELECT r.nombreRol, m.modulo FROM roles r JOIN permisos p ON r.idRol = p.idRol JOIN modulos m ON p.idModulo = m.idModulo WHERE r.idRol = ?',
          [user.idRol],
          (error, data) => {
            if (error) {
              return res.status(500).json({ error: 'Error en la base de datos' });
            }

            const permisos = data.map(item => item.modulo);
            const nombreRol = data.length > 0 ? data[0].nombreRol : '';


            const token = jwt.sign(
              {
                documento,
                nombreRol,
                nombres: user.nombres,
                apellidos: user.apellidos,
                permisos
              },
              'mi-secreto-sesion',
              { expiresIn: '1d' }
            );

            res.cookie('token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true });

            // Validar si el nombre del rol es 'Administrador'
            if (nombreRol === 'Administrador') {
              // Redireccionar al dashboard del administrador
              res.json({ token, redirect: 'admin/dashboard.php' });
            } else if (permisos.length > 0) {
              // Redireccionar al permiso seleccionado (si tiene permisos)
              const randomPermission = permisos[Math.floor(Math.random() * permisos.length)];
              res.json({ token, redirect: 'admin/' + randomPermission + '.php' });
            } else {
              // No tiene permisos para acceder a ninguna página
              res.json({ token, redirect: 'error.php' });
            }
          }
        );
      });
    }
  );
};


module.exports = { getUsuario, postUsuario };

