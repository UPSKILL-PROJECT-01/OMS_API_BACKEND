var express = require('express');
var router = express.Router();
const SurtosController = require('../controllers/surtosController');

router.post('/', SurtosController.createSurto);
// ISSO VAI PARA PAISES: /api/paises/:cp/surtos
// router.get('/:cp/surtos', SurtosController.getSurtosByPais);
// ISSO VAI PARA VIRUS: 
// router.get('/:cv', SurtosController.getSurtosAtivosByVirus);
// ISSO VAI PARA VIRUS: 
// router.get('/:cv/surtos', SurtosController.getSurtosOcorridosByVirus);
// router.put('/:cp/:cv', SurtosController.updateFinalDateSurto);

module.exports = router;