var express = require('express');
var router = express.Router();

const PaisController = require('../controllers/paisController');

// ====================== POST ======================
router.post('/', PaisController.createCountry);

// ====================== GET ======================
router.get('/', PaisController.getAll);
router.get('/id/:id', PaisController.getById);
router.get('/nome/:nome', PaisController.getByName);
router.get('/codigoPais/:codigoPais', PaisController.getByCode);
router.get('/codigoZona/:codigoZona', PaisController.getByZoneCode);

// ====================== PUT ======================
router.put('/id/:id', PaisController.updateCountry);


// ====================== DELETE ======================
router.delete('/id/:id', PaisController.deleteCountry);


// ====================== FRED =======================
const recomendacoesController = require('../controllers/recomendacoesControllers');
router.get('/:codigoPais/recomendacoes', recomendacoesController.getRecomendacoesByPais);

module.exports = router;
