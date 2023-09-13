const { Router } = require('express')


const router = Router()



const {getUsuario, postUsuario} = require('../controllers/login/login')
const {recuperarPass, actualizarPass} = require('../controllers/login/version')
const {logout} = require('../controllers/login/logout')


//METODOS DE OBTENER Y DE ENVIAR PAR EL LOGIN
router.get('/', getUsuario);
router.get('/logout', logout);

router.post('/pp', postUsuario);


router.post('/pruebalogi', postUsuario);

router.post('/recuperarPass', recuperarPass);
router.put('/actualizarPass', actualizarPass);





module.exports = router;