const { Router } = require('express')
const router = Router()

const {listBooks,listBook} = require('../controllers/books/list')
const {addBook,validationTitleIsbn} = require('../controllers/books/add')
const {updateBook,validationTitleIsbnUpdate,validationTitleIsbnAdd} = require('../controllers/books/update')

const {listCategory} = require('../controllers/books/categories/list')

const {listCopies,listCopy,countCopies,} = require('../controllers/books/copies/list')
const {updateStateCopy,listAllCopiesStates,updateCopy,validationCopieUpdate} = require('../controllers/books/copies/update')
const {listStateCopy, addCopy,validationCopieAdd} = require('../controllers/books/copies/add')
const {listCopyInLoan} = require('../controllers/books/copies/details')

router.post('/validationCopieUpdate', validationCopieUpdate);
router.post('/validationCopieAdd', validationCopieAdd);

router.get('/categorias', listCategory);
router.get('/copies/states', listAllCopiesStates);

router.get('/copie/state', listStateCopy);
router.get('/copies/:idLibro', listCopies);
router.get('/copies/count/:idLibro', countCopies);
router.get('/copie/:idEjemplar', listCopy);
router.get('/copie/copyInLoad/:idEjemplar', listCopyInLoan);
router.post('/copie/addCopy', addCopy);
router.post('/copie/:idEjemplar', updateStateCopy);
router.put('/copie/updatecopy/:idEjemplar', updateCopy);


router.get('/:id', listBook);
router.get('/', listBooks);
router.post('/validationAddBook', validationTitleIsbn);
router.post('/validationUpdateBook', validationTitleIsbnUpdate);
router.post('/validationTitleIsbnAdd', validationTitleIsbnAdd);
router.post('/add', addBook);
router.put('/:id', updateBook);

module.exports = router;