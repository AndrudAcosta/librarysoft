const { Router } = require('express')


const router = Router()


const {listarBeneficiariosup, listarIdUsuarios, actualizarBeneficiario, cambiodeEstado, validarEstado} = require('../controllers/usuarios/update');
const {listarBeneficiarios, listadoBeneficiarios,  obtenerRoles } = require('../controllers/usuarios/list');
const {agregarBeneficiarios, validarCD  } = require('../controllers/usuarios/add');

//LISTAR
router.get('/todos', listarBeneficiarios);
router.get('/bene', listadoBeneficiarios);
router.get('/roles', obtenerRoles);

//AGREGAR
router.post('/agregar', agregarBeneficiarios);
router.post('/validar', validarCD);


//ACTULIZAR
router.get('/:idBeneficiario', listarBeneficiariosup);
router.get('/obtener/:idUsuario', listarIdUsuarios);
router.post('/cambioEstado', cambiodeEstado);
router.post('/validadEstado', validarEstado);
router.put('/beneficiarios/:idBeneficiario', actualizarBeneficiario);



module.exports = router