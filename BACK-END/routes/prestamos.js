const { Router } = require('express');
const router = Router();

const { verPrestamoUpdate, obtenerEstadosEjemplares, actualizarPrestamo } = require('../controllers/prestamos/update');
const {ListarPrestamos} = require('../controllers/prestamos/list');
const {listarBeneficiarios, listarLibros,agregarPrestamo} = require('../controllers/prestamos/add');
const {verPrestamo, verPrestamoMovil} = require('../controllers/prestamos/view'); 

//LISTAR
router.get('/todosB', listarBeneficiarios);
router.get('/todosL', listarLibros);
router.get('/todosP', ListarPrestamos);

//AGREGAR
router.post('/agregar', agregarPrestamo);

//VISUALIZAR
router.get('/:idPrestamo', verPrestamo);


//ACTUALIZAR
router.get('/todosU/:idPrestamo', verPrestamoUpdate);
router.put('/actualizar/:idPrestamo', actualizarPrestamo);
router.get('/todosE/estadosEjemplares', obtenerEstadosEjemplares);

module.exports = router;
