var express = require('express'); 
var router = express.Router();
const virusController = require('../controllers/virusController');

router.post('/', virusController.createVirus);
router.get('/', virusController.getAllVirus); // PARA TESTE

module.exports = router;
