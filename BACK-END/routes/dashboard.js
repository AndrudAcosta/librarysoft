const { Router } = require('express')
const router = Router()

const {getFetchPrestamos, getYear} = require('../controllers/dashboard/prestamos')


router.get('/:year', getFetchPrestamos);
router.get('/', getYear);




module.exports = router;