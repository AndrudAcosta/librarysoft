const { Router } = require('express')


const router = Router()


const { listarSancionesUp, actualizarSancion } = require('../controllers/sanciones/update');
const { obtenerTsancion, obtenerEsancion, listarSanciones } = require('../controllers/sanciones/list');
const { agregarSancion, listarBeneficiario  } = require('../controllers/sanciones/add');
const { verSanciones } = require('../controllers/sanciones/view');

//LISTAR
router.get('/todos', listarSanciones);
router.get('/bene', listarBeneficiario);
router.get('/sancionesT', obtenerTsancion);
router.get('/sancionesE', obtenerEsancion);

//AGREGAR
router.post('/agregar', agregarSancion);


//ACTULIZAR
router.get('/:idSancion', listarSancionesUp);
router.put('/update/:idSancion', actualizarSancion);

//VISUALIZAR
router.get('/:idSancion', verSanciones);


module.exports = router