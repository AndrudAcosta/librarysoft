const conexion = require('../../db/conexion');
const response = require('express')

const obtenerTsancion = (req, res = response) => {
    const sql = 'SELECT * FROM tiposancion';

    conexion.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener los tipos de sancion:', err);
            res.status(500).json({ error: 'Error al obtener los tipos de sancion' });
            return;
        }

        res.json({ tsancion: data });
    });
};

const obtenerEsancion = (req, res = response) => {
    const sql = 'SELECT * FROM estadosancion';

    conexion.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener los estados de sancion:', err);
            res.status(500).json({ error: 'Error al obtener los estados de sancion' });
            return;
        }

        res.json({ esancion: data });
    });
};

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

const listarSanciones = (req, res = response) => {
    const filtro = req.query.filtro || ''; // Obtén el valor del parámetro de consulta "filtro"

    // Modifica la consulta SQL para incluir la búsqueda por correo y documento
    const sql = `SELECT s.idSancion, s.observacion, s.fechaAsignacion, s.fechaCierre, b.nombres, b.apellidos, e.nombreEstado, t.nombreTipo, s.idBeneficiario, s.idEsancion, s.idTsancion, b.idUsuario, u.idUsuario, u.documento
    FROM sanciones s
    JOIN beneficiarios b ON s.idBeneficiario = b.idBeneficiario
    JOIN estadosancion e ON s.idEsancion = e.idEsancion
    JOIN tiposancion t ON s.idTsancion = t.idTsancion
    JOIN usuarios u ON b.idUsuario = u.idUsuario
    WHERE b.nombres LIKE '%${filtro}%' OR b.apellidos LIKE '%${filtro}%' OR t.nombreTipo LIKE '%${filtro}%' OR e.nombreEstado LIKE '%${filtro}%' OR u.documento LIKE '%${filtro}%';
    
    `;


    conexion.query(sql, (err, data) => {
        if (err) {
            console.error('Error al obtener las sanciones:', err);
            res.status(500).json({ error: 'Error al obtener las sanciones' });
            return;
        }

        res.json({ sanciones: data });
    });
};




module.exports = {
    obtenerTsancion,
    obtenerEsancion,
    listarBeneficiario,
    listarSanciones
}