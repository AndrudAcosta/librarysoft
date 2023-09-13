const cron = require('node-cron');
const nodemailer = require('nodemailer');
const conexion = require('../../db/conexion');

// Función para obtener los préstamos próximos a vencer en dos días
function PrestamosProximosAVencer() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero

  // Obtener la fecha de ayer (fecha actual menos un día)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() + 2);
  const formattedYesterdayy = yesterday.toISOString().split('T')[0];



  const query = `SELECT prestamos.idPrestamo, b.correo AS correoBeneficiario
                 FROM prestamos
                 INNER JOIN beneficiarios AS b ON prestamos.idBeneficiario = b.idBeneficiario
                 WHERE prestamos.fechaCompromiso = '${formattedYesterdayy}'`;

  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los préstamos próximos a vencer en dos días desde la base de datos:', err);
      return;
    }

    const prestamosProximosAVencer = results;

    prestamosProximosAVencer.forEach(prestamos => {
      enviarNotificacionPorCorreo(prestamos);
    });
  });
}

// Función para enviar una notificación por correo electrónico
function enviarNotificacionPorCorreo(prestamos) {
  const transporter = nodemailer.createTransport({
    // Configura tu transporte de correo (puedes usar Gmail, Outlook, etc.)
    service: 'Gmail',
    auth: {
      user: 'jnvelasquez0921@gmail.com', // Cambia esto al correo que enviará las notificaciones
      pass: 'lqazpucfddhlvvan' // Cambia esto a tu contraseña
    }
  });

  const mailOptions = {
    from: 'jnvelasquez0921@gmail.com', // Cambia esto al correo que enviará las notificaciones
    to: prestamos.correoBeneficiario, // Correo del beneficiario
    subject: 'Préstamo próximo a vencer',
    text: `Tu préstamo con ID ${prestamos.idPrestamo} está próximo a vencer en 2 días. Por favor, asegúrate de devolver los libros a tiempo.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar la notificación por correo electrónico:', error);
    } else {
      console.log(`Notificación enviada`);
    }
  });
}


// Función para verificar los préstamos vencidos 
function PrestamosVencidos() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero

  // Obtener la fecha de ayer (fecha actual menos un día)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split('T')[0];

  const query = `SELECT * FROM prestamos WHERE fechaCompromiso = "${formattedYesterday}"`;

  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los préstamos desde la base de datos:', err);
      return;
    }

    const prestamos = results;

    prestamos.forEach(prestamo => {
      filtroLibros(prestamo);
    });
  });
}

// Función para filtrar los libros no devueltos en un préstamo vencido
function filtroLibros(prestamo) {
  const today = new Date();
  const fechaCompromiso = new Date(prestamo.fechaCompromiso);

  if (fechaCompromiso < today) {
    const query = `SELECT * FROM prestamos_libros WHERE idPrestamo = ${prestamo.idPrestamo}`;

    conexion.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los libros del préstamo desde la base de datos:', err);
        return;
      }

      const librosPrestamo = results;

      const librosNoDevueltos = librosPrestamo.filter(libro => libro.idEstadoLibro === 1);

      if (librosNoDevueltos.length > 0) {
        librosNoDevueltos.forEach(libro => {
          actualizarPrestamo(prestamo.idPrestamo, libro.idEjemplar);
        });
      }
    });
  }
}

// Función para finalizar el préstamo
function actualizarPrestamo(idPrestamo, idEjemplar) {
  const estadoPrestamo = 0;
  const idEstadoPrestamo = 3;
  const idEstadoLibro = 0;

  const prestamoQuery = `UPDATE prestamos SET estadoPrestamo = ${estadoPrestamo} WHERE idPrestamo = ${idPrestamo}`;
  const ejemplarQuery = `UPDATE prestamos_libros SET idEstadoPrestamo = ${idEstadoPrestamo}, idEstadoLibro = ${idEstadoLibro} WHERE idEjemplar = ${idEjemplar}`;

  conexion.query(prestamoQuery, (err, results) => {
    if (err) {
      console.error('Error al actualizar el préstamo:', err);
      return;
    }

    console.log(`Actualización generada para el préstamo ID ${idPrestamo}`);
  });

  conexion.query(ejemplarQuery, (err, results) => {
    if (err) {
      console.error('Error al actualizar el ejemplar:', err);
      return;
    }

    console.log(`Actualización generada para el ejemplar ID ${idEjemplar}`);
  });
}

cron.schedule('0 0 * * *', () => {
  PrestamosProximosAVencer();
});

cron.schedule('0 0 * * *', () => {
  PrestamosVencidos();
});

module.exports = {
  PrestamosVencidos,
  PrestamosProximosAVencer,
};