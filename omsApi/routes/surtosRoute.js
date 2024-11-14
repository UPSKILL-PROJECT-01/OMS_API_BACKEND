var express = require('express');
var router = express.Router();
const SurtosController = require('../controllers/surtosController');

// ===================== POST =====================
router.post('/', SurtosController.createSurto);

// ===================== GET =====================
router.get('/', SurtosController.getAllSurtos);
// router.get('/id/:id', SurtosController.getSurtoById);
// router.get('/codigoSurto/:codigoSurto', SurtosController.getSurtoByCodigoSurto);
// router.get('/ativos', SurtosController.getAllSurtosAtivos);
// router.get('/ocorridos', SurtosController.getAllSurtosOcorridos);
// router.get('/virus/:cv', SurtosController.getAllSurtosByVirus);

// ===================== PUT =====================
router.put('/:cp/:cv', SurtosController.updateFinalDateSurto);


// ISSO VAI PARA VIRUS: /api/virus/:cv - Excluir 'virus' dessa url
router.get('/virus/:cv', SurtosController.getSurtosAtivosByVirus);
// ISSO VAI PARA VIRUS: /api/virus/:cv/surtos - Excluir 'virus'dessa url
router.get('/virus/:cv/surtos', SurtosController.getSurtosOcorridosByVirus);

module.exports = router;

// GETTERS: 
// GET  /api/surtos/
// GET  /api/surtos/id/:id
// GET  /api/surtos/codigoSurto/:cs
// GET: /api/surtos/ativos
// GET: /api/surtos/ocorridos
// GET: /api/surtos/virus/:cv/

// ============================== BENE
// GET  /api/surtos/zona/:cz/
// GET  /api/surtos/zona/:cz/ativos
// GET  /api/surtos/zona/:cz/ocorridos
// GET: /api/surtos/pais/:cp/ativos
// GET: /api/surtos/pais/:cp/ocorridos

