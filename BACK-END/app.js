const Server = require('./models/server');
const cronJobFile = require('./controllers/sanciones/autosan');
const cronJobFile2 = require('./controllers/sanciones/autoact');
const cronPres = require('./controllers/prestamos/autofinal');

require('dotenv').config();

const server = new Server();

server.listen();

cronJobFile();
cronJobFile2();
cronPres.PrestamosProximosAVencer();
cronPres.PrestamosVencidos();