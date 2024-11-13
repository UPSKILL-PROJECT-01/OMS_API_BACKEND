var express = require('express');
var router = express.Router();
const SurtosController = require('../controllers/surtosController');

router.post('/api/surtos', SurtosController.createSurto);
// router.get('/api/paises/:cp/surtos', SurtosController.getSurtosByPais);
// router.get('/api/surtos/virus/:cv', SurtosController.getSurtosAtivosByVirus);
// router.get('/api/virus/:cv/surtos', SurtosController.getSurtosOcorridosByVirus);
// router.put('/api/surtos/:cp/:cv', SurtosController.updateFinalDateSurto);

module.exports = router;