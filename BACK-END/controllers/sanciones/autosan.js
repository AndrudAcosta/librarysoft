const cron = require('node-cron');
const nodemailer = require('nodemailer');
const conexion = require('../../db/conexion');

// Configurar el planificador para que se ejecute cada 30 segundos
cron.schedule('0 0 * * *', () => {
  verificarPrestamosVencidos();
});

module.exports = verificarPrestamosVencidos;


// Función para generar la sanción
function generarSancion(prestamo) {
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
        // Crear sanción para el beneficiario
        crearSancion(prestamo.idBeneficiario);
      }
    });
  }
}

// Función para verificar los préstamos vencidos y generar sanciones
function verificarPrestamosVencidos() {
  // Obtener la fecha actual en el huso horario local
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero

  // Obtener la fecha de ayer (fecha actual menos un día)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split('T')[0];
  // Consulta para obtener los préstamos vencidos
  const query = `SELECT * FROM prestamos WHERE fechaCompromiso = "${formattedYesterday}"`;

  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los préstamos desde la base de datos:', err);
      return;
    }

    const prestamos = results;

    prestamos.forEach((prestamo) => {
      generarSancion(prestamo);
    });
  });
}

function obtenerCorreoBeneficiario(idBeneficiario, callback) {
  const query = `SELECT correo FROM beneficiarios WHERE idBeneficiario = ${idBeneficiario}`;

  conexion.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el correo del beneficiario desde la base de datos:', err);
      return;
    }

    if (results.length > 0) {
      const correo = results[0].correo;
      callback(correo);
    } else {
      callback(null);
    }
  });
}

function sendSancionNotificationEmail(correo, idBeneficiario) {
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
    from: '"Library System" <jnvelasquez0921@gmail.com>',
    to: correo,
    subject: 'Notificación de sanción',
    html: `<p>Estimado beneficiario,</p>
      <p>Te informamos que has sido sancionado debido a un retraso en la entrega de los libros prestados.</p>
      <p>Para más detalles, por favor contacta con nuestro equipo.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo de notificación de sanción:', error);
    } else {
    }
  });
}

function crearSancion(idBeneficiario) {
  // Verificar si el beneficiario ya tiene una sanción activa de tipo "retraso"
  const checkQuery = `SELECT COUNT(*) AS sanciones_activas FROM sanciones WHERE idBeneficiario = ${idBeneficiario} AND idTsancion = 2 AND fechaCierre > NOW()`;

  conexion.query(checkQuery, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error al verificar las sanciones activas del beneficiario:', checkErr);
      return;
    }

    const sancionesActivas = checkResults[0].sanciones_activas;

    if (sancionesActivas > 0) {
      return;
    }

    // Si no tiene una sanción activa, proceder a crear la nueva sanción
    const idTsancion = 2;
    const idEsancion = 1;
    const observacion = "Retraso en la entrega de los libros prestados";

    const fechaAsignacion = new Date();
    const fechaCierre = new Date();
    fechaCierre.setDate(fechaAsignacion.getDate() + 8);

    const query = `INSERT INTO sanciones (idBeneficiario, idTsancion, idEsancion, observacion, fechaAsignacion, fechaCierre) 
                   VALUES (${idBeneficiario}, ${idTsancion}, ${idEsancion}, "${observacion}", "${fechaAsignacion.toISOString()}", "${fechaCierre.toISOString()}")`;

    conexion.query(query, (err, results) => {
      if (err) {
        console.error('Error al crear la sanción en la base de datos:', err);
        return;
      }
      
      // Ahora puedes llamar a la función para enviar el correo de notificación
      obtenerCorreoBeneficiario(idBeneficiario, (correo) => {
        if (correo) {
          sendSancionNotificationEmail(correo, idBeneficiario);
        }
      });
    });
  });
}
