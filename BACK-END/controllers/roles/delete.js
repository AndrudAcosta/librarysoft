const conexion = require('../../db/conexion');
const response = require('express')

const eliminarRol = (req, res) => {
    const idRol = req.body.idRol;

    // Consulta SQL para verificar si existen usuarios asociados al rol
    const sqlVerificarUsuarios = `SELECT COUNT(*) AS total FROM usuarios WHERE idRol = ${idRol}`;

    // Consulta SQL para eliminar los permisos asociados al rol
    const sqlEliminarPermisos = `DELETE FROM permisos WHERE idRol = ${idRol}`;

    // Consulta SQL para eliminar el rol
    const sqlEliminarRol = `DELETE FROM roles WHERE idRol = ${idRol}`;

    // Realizar la consulta para verificar si existen usuarios asociados al rol
    conexion.query(sqlVerificarUsuarios, (errVerificarUsuarios, resultVerificarUsuarios) => {
        if (errVerificarUsuarios) {
            console.error('Error al verificar los usuarios asociados al rol:', errVerificarUsuarios);
            res.status(500).json({ error: 'Error al eliminar el rol' });
            return;
        }

        const tieneUsuariosAsociados = resultVerificarUsuarios[0].total > 0;

        if (tieneUsuariosAsociados) {
            // Mostrar alerta indicando que el rol tiene usuarios asociados
            res.status(400).json({ error: 'El rol tiene usuarios asociados' });
        } else {
            // Realizar la consulta para eliminar los permisos asociados al rol
            conexion.query(sqlEliminarPermisos, (errEliminarPermisos, resultEliminarPermisos) => {
                if (errEliminarPermisos) {
                    console.error('Error al eliminar los permisos:', errEliminarPermisos);
                    res.status(500).json({ error: 'Error al eliminar el rol' });
                    return;
                }

                // Realizar la consulta para eliminar el rol
                conexion.query(sqlEliminarRol, (errEliminarRol, resultEliminarRol) => {
                    if (errEliminarRol) {
                        console.error('Error al eliminar el rol:', errEliminarRol);
                        res.status(500).json({ error: 'Error al eliminar el rol' });
                        return;
                    }

                    res.json({ success: true });
                });
            });
        }
    });
};

module.exports = {
    eliminarRol
};
