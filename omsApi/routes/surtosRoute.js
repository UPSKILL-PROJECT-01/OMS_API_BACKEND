var express = require('express');
var router = express.Router();
const SurtosController = require('../controllers/surtosController');

// ===================== POST =====================
router.post('/', SurtosController.createSurto);

// ===================== PUT =====================
router.put('/:cp/:cv', SurtosController.updateFinalDateSurto);


// ISSO VAI PARA VIRUS: /api/virus/:cv - Excluir 'virus' dessa url
router.get('/virus/:cv', SurtosController.getSurtosAtivosByVirus);
// ISSO VAI PARA VIRUS: /api/virus/:cv/surtos - Excluir 'virus'dessa url
router.get('/virus/:cv/surtos', SurtosController.getSurtosOcorridosByVirus);

module.exports = router;