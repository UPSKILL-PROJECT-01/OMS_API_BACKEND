const express = require('express');
const Zona = require('../models/zonaModel');
const router = express.Router();
var ZonaController = require('../controllers/zonaController');


// ===================== POST =====================
router.post('/', ZonaController.createZone);

// ===================== GET =====================
router.get('/', ZonaController.getAll);
router.get('/id/:id', ZonaController.getById);
router.get('/nome/:nome', ZonaController.getByName);
router.get('/codigoZona/:codigoZona', ZonaController.getByCode);

// ===================== PUT =====================
router.put('/id/:id', ZonaController.updateZone);


// ===================== DELETE =====================
router.delete('/id/:id', ZonaController.deleteZone);

module.exports = router;