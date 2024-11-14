var express = require('express');
var router = express.Router();

const PaisController = require('../controllers/paisController');
const SurtosController = require('../controllers/surtosController');

// ====================== POST ======================
router.post('/', PaisController.createCountry);

// ====================== GET ======================
router.get('/', PaisController.getAll);
router.get('/id/:id', PaisController.getById);
router.get('/nome/:nome', PaisController.getByName);
router.get('/codigoPais/:codigoPais', PaisController.getByCode);
router.get('/codigoZona/:codigoZona', PaisController.getByZoneCode);
router.get('/:cp/surtos', SurtosController.getSurtosByPais);

// ====================== PUT ======================
router.put('/id/:id', PaisController.updateCountry);


// ====================== DELETE ======================
router.delete('/id/:id', PaisController.deleteCountry);

module.exports = router;
