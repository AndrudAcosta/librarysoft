const { Router } = require('express')
const router = Router()

const {cambioEstado, listarRolesup, actualizarRol, validarEstado} = require('../controllers/roles/update');
const {listarRoles,  obtenerModulos } = require('../controllers/roles/list');
const {agregarRol, validarCD  } = require('../controllers/roles/add');
const {eliminarRol} = require('../controllers/roles/delete')

//LISTAR
router.get('/todos', listarRoles);
router.get('/modulos', obtenerModulos);

//AGREGAR
router.post('/agregar', agregarRol);
router.post('/validar', validarCD);

//ACTULIZAR
router.get('/:idRol', listarRolesup);
router.post('/cambioEstado', cambioEstado);
router.post('/validarEstado', validarEstado);
router.put('/:idRol', actualizarRol);

//DELETE
router.post('/eliminarRol', eliminarRol)

module.exports = router