const SurtoModel = require('../models/surtosModel');

exports.createSurto = async function(req, res) {
	console.log("POST: /api/surtos - " + JSON.stringify(req.body));
	var {codigoSurto, codigoVirus, codigoZona, dataDeteccao, dataFim} = req.body;

	try {
		// codigoVirus = await VirusModel.findOne({codigoVirus: codigoVirus});
		// codigoZona = await ZonaModel.findOne({codigoZona: codigoZona});
		const surto = new SurtoModel({
			codigoSurto: codigoSurto,
			codigoVirus: codigoVirus,
			codigoZona: codigoZona,
			dataDeteccao: parseDateString(dataDeteccao),
			dataFim: parseDateString(dataFim)
		});
		await surto.save();
		res.status(201).json({message: 'Surto criado!'});
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Erro de Validação: ';
			for (let field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({error: errorMessage.trim()});
		} else if (err.code === 11000) {
			res.status(400).json({ error: 'Código de surto duplicado. Por favor use valores únicos.'});
		} else {
			res.status(500).json({ error: 'Erro ao salvar Surto', details: err.message});
		}
	}
}

function parseDateString(dateString) {
	if (!dateString)
		return null;
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}
