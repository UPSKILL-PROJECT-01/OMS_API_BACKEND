// virusController.js

const virusModel = require('../models/virusModel');

exports.createVirus = async function(req, res) {
	console.log("POST: /api/virus - " + JSON.stringify(req.body));
	const { codigoVirus, nomeVirus } = req.body;
	try {
		const virus = new virusModel({
			codigoVirus,
			nomeVirus
		});
		await virus.save();
		res.status(201).json({ message: 'Virus created!' });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Validation Error: ';
			for (let field in err.errors) {
				errorMessage += `${err.errors[field].message} `;
			}
			if (err.errors.codigoVirus) {
				errorMessage += "Must be 'V' + 6 digits";
			}	
			res.status(400).json({ error: errorMessage.trim() });
		} else if (err.code === 11000) {
			res.status(400).json({ error: 'Duplicate codigoVirus. Please use unique values.'
			});
		} else {
			res.status(500).json({ error: 'Error saving virus', details: err.message });
		}
	}
};

// PARA TESTE -> PARA ELIMINAR
exports.getAllVirus = async function(req, res) {
	try {
		const virus = await virusModel.find();
		res.status(200).json(virus);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao recuperar virus', details: err.message });
	}
};


exports.getRecomendacaoStatus = async function(req, res) {
	const { id } = req.params;
    try {
		const recomendacao = await recomendacoesModel.findById(id);
        if (!recomendacao) {
			return res.status(404).json({ error: 'Recomendação não encontrada' });
        }
        res.status(200).json({ status: recomendacao.status });
    } catch (err) {
		res.status(500).json({ error: 'Erro ao recuperar a recomendação', details: err.message });
    }
};


// exports.createDriver = async function(req, res) {
//     console.log("POST: /api/drivers - " + JSON.stringify(req.body));
//     const {name, idCard, licence} = req.body;
//     try {
//         const driver = new DriverModel({
//             name,
//             idCard,
//             licence
//         });

//         await driver.save();
//         res.status(201).json({ message: 'Driver created!' });
//     } catch (err) {
//         if (err.name === 'ValidationError') {
//             let errorMessage = 'Validation Error: ';
//             for (let field in err.errors) {
//                 errorMessage += `${err.errors[field].message} `;
//             }
//             res.status(400).json({ error: errorMessage.trim() });
//         } else if (err.code === 11000) {
//             res.status(400).json({ error: 'Duplicate idCard or licence. Please use unique values.' });
//         } else {
//             res.status(500).json({ error: 'Error saving driver', details: err.message });
//         }
//     }
// };

/*
const CarModel = require('../models/carModel');
const DriverModel = require('../models/driverModel');
const CarInputDTO = require('../DTO/carInputDTO');
const CarOutputDTO = require('../DTO/carOutputDTO');

exports.createCar = async function(req, res) {
    console.log("POST: /api/cars - " + JSON.stringify(req.body));
    const { plate, date, ownerDL } = req.body;

    try {
        const ownerDriver = await DriverModel.findOne({ licence: ownerDL });
        if (!ownerDriver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const carInputDTO = new CarInputDTO(plate, parseDateString(date), ownerDL);
        const car = await carInputDTO.toCar();

        await car.save();
        res.status(201).json({ message: 'Car created!' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            let errorMessage = 'Validation Error: ';
            for (let field in err.errors) {
                errorMessage += `${err.errors[field].message} `;
            }
            res.status(400).json({ error: errorMessage.trim() });
        } else if (err.code === 11000) {
            res.status(400).json({ error: 'Duplicate plate. Please use unique values.' });
        } else {
            res.status(500).json({ error: 'Error saving car', details: err.message });
        }
    }
};

exports.getAllCars = async function(req, res) {
    console.log("GET: /api/cars");
    try {
        const cars = await CarModel.getAllCars();
        const carDTOs = cars.map(car => CarOutputDTO.fromCar(car));
        res.status(200).json(carDTOs);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving cars', details: err.message });
    }
};

exports.getCarById = async function(req, res) {
    console.log("GET: /api/cars by Id: " + req.params.id);
    try {
        const car = await CarModel.getCarById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(CarOutputDTO.fromCar(car));
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving car', details: err.message });
    }
};

exports.getCarByPlate = async function(req, res) {
    console.log("GET: /api/cars by Plate: " + req.params.plate);
    try {
        const car = await CarModel.getCarByPlate(req.params.plate);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(CarOutputDTO.fromCar(car));
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving car', details: err.message });
    }
};

exports.getCarsByOwnerDriverLicence = async function(req, res) {
    console.log("GET: /api/cars By Owner Driver licence: " + req.params.dl);
    try {
        const cars = await CarModel.getCarsByOwnerDriverLicence(req.params.dl);
        const carDTOs = cars.map(car => CarOutputDTO.fromCar(car));
        res.status(200).json(carDTOs);
    } catch (err) {
        if (err.message === 'Driver not found') {
            res.status(404).json({ message: 'Driver not found' });
        } else {
            res.status(500).json({ error: 'Error retrieving cars', details: err.message });
        }
    }
};

exports.updateCar = async function(req, res) {
    console.log("PUT: /api/cars/" + req.params.id + " - " + JSON.stringify(req.body));
    try {
        const car = await CarModel.updateCar(req.params.id, req.body);
        res.status(200).json({ message: 'Car updated!', car });
    } catch (err) {
        if (err.name === 'ValidationError') {
            let errorMessage = 'Validation Error: ';
            for (let field in err.errors) {
                errorMessage += `${err.errors[field].message} `;
            }
            res.status(400).json({ error: errorMessage.trim() });
        } else if (err.code === 11000) {
            res.status(400).json({ error: 'Duplicate plate. Please use unique values.' });
        } else if (err.message === 'Car not found' || err.message === 'Driver not found') {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ error: 'Error updating car', details: err.message });
        }
    }
};

exports.deleteCar = async function(req, res) {
    console.log("DELETE: /api/cars/" + req.params.id);
    try {
        await CarModel.deleteCar(req.params.id);
        res.status(200).json({ message: 'Car deleted!' });
    } catch (err) {
        if (err.message === 'Car not found') {
            res.status(404).json({ message: 'Car not found' });
        } else {
            res.status(500).json({ error: 'Error deleting car', details: err.message });
        }
    }
};

function parseDateString(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}
*/