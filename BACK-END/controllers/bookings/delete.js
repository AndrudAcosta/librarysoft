const conexion = require('../../db/conexion');
const response = require('express')
const nodemailer = require('nodemailer');

const deleteBooking = (req, res = response) => {
    const { idReserva } = req.body;
  
    if (!idReserva) {
      res.status(400).json({ msg: 'Se requiere el id del Reserva' });
      return;
    }
  
    const sql = 'DELETE FROM reservas WHERE idReserva = ?';
    const values = [idReserva];
  
    conexion.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al eliminar Reserva:', err);
        res.status(500).json({ msg: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ msg: 'Reserva eliminada correctamente'});
          
        } else {
          res.status(404).json({ msg: 'Reserva no encontrada'});
        }
      }
    });
  };
 
  const emailDelete = (req, res) => {
    const { idReserva } = req.body;
    // Buscar el correo en la tabla de beneficiarios
    const sql = `SELECT r.evento, r.fechaReserva, r.horaInicio, r.horaFin, b.correo FROM reservas r INNER JOIN usuarios u ON r.documento = u.Documento INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario WHERE idReserva = ?;`;

    conexion.query(sql, [idReserva], (err, data) => {
    if (err) {
        console.error('Error al ejecutar la consulta de beneficiarios:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (data.length === 0) {
        return res.status(404).json({ error: 'Documento no encontrado' });
    }
    const correo = data[0].correo;
    const evento = data[0].evento;
    const fechaReserva = data[0].fechaReserva;
    const horaInicio = data[0].horaInicio;
    const horaFin = data[0].horaFin;

    // Enviar correo con el enlace de recuperación y el token en el cuerpo del mensaje
    email(correo,evento,fechaReserva,horaInicio,horaFin);

    return res.json({ message: 'Correo de eliminacion de reserva enviado' });
    });
};

function email(correo,evento,fechaReserva,horaInicio,horaFin) {


    const year = fechaReserva.getFullYear();
    const month = String(fechaReserva.getMonth() + 1).padStart(2, '0');
    const day = String(fechaReserva.getDate()).padStart(2, '0');
    const Date = `${year}-${month}-${day}`;

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
    from: '"Biblioteca" <jnvelasquez0921@gmail.com>',
    to: correo,
    subject: 'Eliminación de reserva',
    html: `<p>Tu evento "${evento}" en la fecha ${Date} con el horario de ${horaInicio} a ${horaFin} a sido eliminada. Si desea mas información contáctate con el administrador.</p>`,};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      // Enviar respuesta en formato JSON
      return res.status(200).json({ message: 'Correo de eliminacion de reserva enviado' });

    }
  });

}

const emailCancel = (req, res) => {
  const { idReserva } = req.body;
  // Buscar el correo en la tabla de beneficiarios
  const sql = `SELECT r.evento, r.fechaReserva, r.horaInicio, r.horaFin, b.correo FROM reservas r INNER JOIN usuarios u ON r.documento = u.Documento INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario WHERE idReserva = ?;`;

  conexion.query(sql, [idReserva], (err, data) => {
  if (err) {
      console.error('Error al ejecutar la consulta de beneficiarios:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
  }

  if (data.length === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
  }
  const correo = data[0].correo;
  const evento = data[0].evento;
  const fechaReserva = data[0].fechaReserva;
  const horaInicio = data[0].horaInicio;
  const horaFin = data[0].horaFin;

  // Enviar correo con el enlace de recuperación y el token en el cuerpo del mensaje
  emailCancelBooking(correo,evento,fechaReserva,horaInicio,horaFin);

  return res.json({ message: 'Correo de eliminacion de reserva enviado' });
  });
};

function emailCancelBooking(correo,evento,fechaReserva,horaInicio,horaFin) {


  const year = fechaReserva.getFullYear();
  const month = String(fechaReserva.getMonth() + 1).padStart(2, '0');
  const day = String(fechaReserva.getDate()).padStart(2, '0');
  const Date = `${year}-${month}-${day}`;

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
  from: '"Biblioteca" <jnvelasquez0921@gmail.com>',
  to: correo,
  subject: 'Cancelación de reserva',
  html: `<p>Tu evento "${evento}" en la fecha ${Date} con el horario de ${horaInicio} a ${horaFin} a sido cancelada. Si desea mas información contáctate con el administrador.</p>`,};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error al enviar el correo:', error);
  } else {
    // Enviar respuesta en formato JSON
    return res.status(200).json({ message: 'Correo de eliminacion de reserva enviado' });

  }
});

}

const emailConfirmation = (req, res) => {
  const { idReserva } = req.body;
  // Buscar el correo en la tabla de beneficiarios
  const sql = `SELECT r.evento, r.fechaReserva, r.horaInicio, r.horaFin, b.correo FROM reservas r INNER JOIN usuarios u ON r.documento = u.Documento INNER JOIN beneficiarios b ON u.idUsuario = b.idUsuario WHERE idReserva = ?;`;

  conexion.query(sql, [idReserva], (err, data) => {
  if (err) {
      console.error('Error al ejecutar la consulta de beneficiarios:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
  }

  if (data.length === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
  }
  const correo = data[0].correo;
  const evento = data[0].evento;
  const fechaReserva = data[0].fechaReserva;
  const horaInicio = data[0].horaInicio;
  const horaFin = data[0].horaFin;

  // Enviar correo con el enlace de recuperación y el token en el cuerpo del mensaje
  emailConfirmationBooking(correo,evento,fechaReserva,horaInicio,horaFin);

  return res.json({ message: 'Correo de eliminacion de reserva enviado' });
  });
};

function emailConfirmationBooking(correo,evento,fechaReserva,horaInicio,horaFin) {


  const year = fechaReserva.getFullYear();
  const month = String(fechaReserva.getMonth() + 1).padStart(2, '0');
  const day = String(fechaReserva.getDate()).padStart(2, '0');
  const Date = `${year}-${month}-${day}`;

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
  from: '"Biblioteca" <jnvelasquez0921@gmail.com>',
  to: correo,
  subject: 'Confirmación de reserva',
  html: `<p>Tu evento "${evento}" en la fecha ${Date} con el horario de ${horaInicio} a ${horaFin} a sido confirmada.</p>`,};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error al enviar el correo:', error);
  } else {
    // Enviar respuesta en formato JSON
    return res.status(200).json({ message: 'Correo de eliminacion de reserva enviado' });

  }
});
}

module.exports = {
    deleteBooking,
    emailDelete,
    emailCancel,
    emailConfirmation
} 