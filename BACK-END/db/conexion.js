const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'librarysoft',
});

conexion.connect((error) => {
  if (error) {
    console.error('Error de conexion a la base de datos:', error);
    return;
  }
  console.log('conectado a la base de datos');
});

module.exports = conexion;



