var express = require('express'); 
var router = express.Router();
const virusController = require('../controllers/virusController');

router.post('/', virusController.createVirus);
router.get('/', virusController.getAllVirus);

module.exports = router;




// router.post('/', DriverController.createDriver);
// router.get('/', DriverController.getAllDrivers);
// router.get('/id/:id', DriverController.getDriverById);
// router.get('/name/:name', DriverController.getDriverByName);
// router.get('/idcard/:idcard', DriverController.getDriverByIdCard);
// router.get('/dl/:dl', DriverController.getDriverByLicence);
// router.put('/:id',DriverController.updateDriver);
// router.delete('/:id',DriverController.deleteDriver);

