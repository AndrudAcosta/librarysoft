const { Router } = require('express')
const router = Router()

const {listBookings,listBooking} = require('../controllers/bookings/list')
const {addBooking} = require('../controllers/bookings/add')
const {updateBooking,updateStateBooking} = require('../controllers/bookings/update')
const {deleteBooking, emailDelete,emailCancel,emailConfirmation} = require('../controllers/bookings/delete')

router.get('/listAll', listBookings);
router.get('/listBooking/:idReserva', listBooking);

router.post('/addBooking', addBooking);

router.put('/', updateBooking);
router.put('/updateStateBooking', updateStateBooking);

router.delete('/delete', deleteBooking);
router.post('/emailDelete', emailDelete);
router.post('/emailCancel', emailCancel);
router.post('/emailConfirmation', emailConfirmation);

module.exports = router;