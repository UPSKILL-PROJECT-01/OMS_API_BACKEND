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

// =============================================== LEILA ->
//GETTERS: 
// GET  /api/surtos/
// GET  /api/surtos/id/:id
// GET  /api/surtos/codigoSurto/:cs
// GET: /api/surtos/ativos
// GET: /api/surtos/ocorridos
// GET: /api/surtos/virus/:cv/
// GET: /api/surtos/virus/:cv/ocorridos
// GET: /api/surtos/virus/:cv/ativos

// =============================================== BENE ->
// GET  /api/surtos/zona/:cz/
router.get('/virus/zona/:cz', SurtosController.allSurtosByZone);
// GET  /api/surtos/zona/:cz/ativos
router.get('/virus/zona/:cz/ativos', SurtosController.SurtosAtivosByZone);
// GET  /api/surtos/zona/:cz/ocorridos
router.get('/virus/zona/:cz/ocorridos', SurtosController.SurtosOcorridosByZone);
// GET: /api/surtos/pais/:cp/ativos
router.get('/virus/zona/:cp/ativos', SurtosController.SurtosAtivosByPais);
// GET: /api/surtos/pais/:cp/ocorridos


router.get('/virus/zona/:cp/ocorridos', SurtosController.SurtosOcorridosByPais);