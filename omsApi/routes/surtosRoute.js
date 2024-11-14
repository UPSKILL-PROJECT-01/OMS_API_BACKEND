var express = require('express');
var router = express.Router();
const SurtosController = require('../controllers/surtosController');

router.post('/', SurtosController.createSurto);
// ISSO VAI PARA PAISES: /api/paises/:cp/surtos - Excuir 'paises' dessa url 
router.get('/paises/:cp/surtos', SurtosController.getSurtosByPais);
// ISSO VAI PARA VIRUS: /api/virus/:cv - Excluir 'virus' dessa url
router.get('/virus/:cv', SurtosController.getSurtosAtivosByVirus);
// ISSO VAI PARA VIRUS: /api/virus/:cv/surtos - Excluir 'virus'dessa url
router.get('/virus/:cv/surtos', SurtosController.getSurtosOcorridosByVirus);
router.put('/:cp/:cv', SurtosController.updateFinalDateSurto);

module.exports = router;