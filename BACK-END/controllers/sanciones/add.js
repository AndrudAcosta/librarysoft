const nodemailer = require('nodemailer');
const conexion = require('../../db/conexion');
 
// METODO POST DE AGREGAR ROL
const agregarSancion = async (req, res) => {
  const { idBeneficiario, fechaActualGlobal, estado, sancion, fechaFin, observacion } = req.body;

  const fechaInicio = new Date(fechaActualGlobal);
  const fechaFinn = new Date(fechaFin);
  fechaInicio.setDate(fechaInicio.getDate() + 1);
  fechaFinn.setDate(fechaFinn.getDate() + 1);

  try {
    const sqlObtenerTipo = 'SELECT idTsancion FROM tiposancion WHERE nombreTipo = ?';
    const valuesObtenerTipo = [sancion];

    conexion.query(sqlObtenerTipo, valuesObtenerTipo, async (err, resultObtenerTipo) => {
      if (err) {
        console.error('Error al obtener el idTsancion:', err);
        res.status(500).json({ error: 'Error al obtener el idTsancion' });
        return;
      }

      if (!resultObtenerTipo || resultObtenerTipo.length === 0 || !resultObtenerTipo[0].idTsancion) {
        console.error('No se pudo obtener el idTsancion');
        res.status(400).json({ error: 'No se pudo obtener el idTsancion' });
        return;
      }

      const idTsancion = resultObtenerTipo[0].idTsancion;

      const sqlObtenerEstado = 'SELECT idEsancion FROM estadosancion WHERE nombreEstado = ?';
      const valuesObtenerEstado = [estado];

      conexion.query(sqlObtenerEstado, valuesObtenerEstado, async (err, resultObtenerEstado) => {
        if (err) {
          console.error('Error al obtener el idEsancion:', err);
          res.status(500).json({ error: 'Error al obtener el idEsancion' });
          return;
        }

        if (!resultObtenerEstado || resultObtenerEstado.length === 0 || !resultObtenerEstado[0].idEsancion) {
          console.error('No se pudo obtener el idEsancion');
          res.status(400).json({ error: 'No se pudo obtener el idEsancion' });
          return;
        }

        const idEsancion = resultObtenerEstado[0].idEsancion;

        const sqlSanciones = 'INSERT INTO sanciones (idBeneficiario, idTsancion, idEsancion, observacion, fechaAsignacion, fechaCierre) VALUES (?,?,?,?,?,?)';
        const valuesSanciones = [idBeneficiario, idTsancion, idEsancion, observacion, fechaInicio, fechaFinn];

        conexion.query(sqlSanciones, valuesSanciones, async (err, resultSanciones) => {
          if (err) {
            console.error('Error al guardar la sancion:', err);
            res.status(500).json({ error: 'Error al guardar la sancion' });
            return;
          }
          res.status(200).json({ message: 'Registro exitoso' });

          // Enviar notificación de sanción por correo electrónico
          obtenerCorreoBeneficiario(idBeneficiario, (correo) => {
            if (correo) {
              sendSancionNotificationEmail(correo, observacion);
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    res.status(500).json({ error: 'Error al guardar el rol' });
  }
};

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

function sendSancionNotificationEmail(correo, observacion) {
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
      <p>Te informamos que has sido sancionado debido a lo siguiente:</p>
      <p>${observacion}</p>
      <p>Para más detalles, por favor contacta con nuestro equipo.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo de notificación de sanción:', error);
    } else {
    }
  });
}

//METODO PARA OBTENER LA INFORMACION DEL BENEFICIARIO
const listarBeneficiario = (req, res = response) => {
  const filtro = req.query.filtro || '';

  const sql = `SELECT b.idBeneficiario, b.nombres, b.apellidos, u.estado, s.idEsancion
              FROM beneficiarios b
              INNER JOIN usuarios u ON b.idUsuario = u.idUsuario
              LEFT JOIN sanciones s ON b.idBeneficiario = s.idBeneficiario
              WHERE u.documento = '${filtro}';`;

  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los beneficiarios:', err);
      return res.status(500).json({ error: 'Error al obtener los beneficiarios' });
    }

    const beneficiariosConCampos = data.map((beneficiario) => {
      if (beneficiario.idEsancion === 1 || beneficiario.idEsancion === 3) {
        return {
          alcanzoMaximo: true
        };
      } else {
        return {
          idBeneficiario: beneficiario.idBeneficiario,
          apellidos: beneficiario.apellidos,
          nombres: beneficiario.nombres
        };
      }
    });

    const tieneSancion = beneficiariosConCampos.some(beneficiario => beneficiario.alcanzoMaximo);

    if (tieneSancion) {
      // Si tiene una sanción activa, enviar la respuesta con el indicador correspondiente
      return res.json({ tieneSancion: true });
    } else {
      // Si no tiene sanciones activas, enviar la respuesta con los beneficiarios
      return res.json({ beneficiarios: beneficiariosConCampos });
    }
  });
};



module.exports = {
  agregarSancion,
  listarBeneficiario
}