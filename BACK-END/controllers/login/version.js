const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const conexion = require('../../db/conexion');
const jwt = require("jsonwebtoken") 



// Ruta para recuperar la contraseña
const recuperarPass = (req, res) => {
    const { documento } = req.body;
    // Buscar el correo en la tabla de beneficiarios
    const sql = `SELECT correo, idUsuario FROM beneficiarios WHERE idUsuario IN (SELECT idUsuario FROM usuarios WHERE documento = ?)`;

    conexion.query(sql, [documento], (err, data) => {
    if (err) {
        console.error('Error al ejecutar la consulta de beneficiarios:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (data.length === 0) {
        return res.status(404).json({ error: 'Documento no encontrado' });
    }

    const correo = data[0].correo;
    const idUsuario = data[0].idUsuario;

    // Generar un token único para el enlace de recuperación de contraseña
    const token = jwt.sign({ idUsuario: idUsuario }, 'key-secret', { expiresIn: '1m' });

    // Enviar correo con el enlace de recuperación y el token en el cuerpo del mensaje
    sendRecoveryEmail(correo, token);

    return res.json({ message: 'Correo de recuperación enviado', token: token });
    });
};





const actualizarPass = (req, res) => {
  const { nuevaContraseña } = req.body;
  const { token } = req.query; // Obtener el token de la URL

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  // Verificar el token y extraer el idUsuario
  jwt.verify(token, 'key-secret', (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err);
      return res.status(400).json({ error: 'El link ha expirado. Por favor, solicite un nuevo enlace de recuperación.' });
    }

    const idUsuario = decoded.idUsuario;

    // Encriptar la contraseña
    bcrypt.hash(nuevaContraseña, 10, (err, hash) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      // Realizar la actualización de la contraseña en la base de datos
      const sql = 'UPDATE usuarios SET password = ? WHERE idUsuario = ?';
      conexion.query(sql, [hash, idUsuario], (err, data) => {
        if (err) {
          console.error('Error al actualizar la contraseña:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (data.affectedRows === 0) {
          return res.status(404).json({ error: 'El usuario no existe' });
        }

        return res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
      });
    });
  });
};


  
  
 // Función para enviar el correo de recuperación
function sendRecoveryEmail(correo, token) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: 'jnvelasquez0921@gmail.com',
        pass: 'lqazpucfddhlvvan',
    },
    });
  
    const mailOptions = {
      from: '"Recuperación de contraseña" <jnvelasquez0921@gmail.com>',
      to: correo,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
      <a href="http://localhost/LIBRARYSOFTT/FRONT-END/VIEWS/actualizar.php?token=${token}">Recuperar contraseña</a>`,};
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
      } else {
        // Enviar respuesta en formato JSON
        return res.status(200).json({ message: 'Correo de recuperación enviado', token: token });

      }
    });
  
}



module.exports = { 
    recuperarPass,
    actualizarPass
}
