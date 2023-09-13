const { Router } = require('express')
const router = Router()


const {getFetchReservas, getYearsReservas} = require('../controllers/dashboard/reservas')

//trae el mes y la cantidad
router.get('/:year', getFetchReservas);

//trae los años que hay
router.get('/', getYearsReservas);



module.exports = router;