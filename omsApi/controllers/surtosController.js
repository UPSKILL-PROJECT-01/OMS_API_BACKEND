const SurtoModel = require('../models/surtosModel');
const ZonaModel = require('../models/zonaModel');
const PaisModel = require('../models/paisModel');

exports.createSurto = async function(req, res) {
	console.log("POST: /api/surtos - " + JSON.stringify(req.body));
	var {codigoSurto, codigoVirus, codigoZona, dataDeteccao, dataFim} = req.body;

	try {
		// codigoVirus = await VirusModel.findOne({codigoVirus: codigoVirus});
		const surto = new SurtoModel({
			codigoSurto: codigoSurto,
			codigoVirus: codigoVirus,
			codigoZona: codigoZona,
			dataDeteccao: dataDeteccao,
			dataFim: dataFim ? new Date(dataFim) : null
		});
		await surto.save();
		res.status(201).json({message: 'Surto criado!', surto: surto});
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


exports.getSurtosByPais = async function(req, res) {
	console.log("GET:/api/paises/surtos by codigoPais: " + req.params.cp);
	try {
		const pais = await PaisModel.findOne({codigoPais: req.params.cp});
		if (!pais)
		{
			console.log(`codigoPais ${req.params.cp} não existe.`);
			return res.status(204).send();
		}
		const zona = pais.codigoZona;
		const surtos = await SurtoModel.find({codigoZona: zona});
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({error: 'Erro ao buscar surtos', details: err});
	}
};

exports.getSurtosAtivosByVirus = async function(req, res) {
	console.log("GET:api/virus/ Surtos ativos por virus: " + req.params.cv);
	try {
		const virus = await SurtoModel.find({
			codigoVirus: req.params.cv,
			$or: [{ dataFim: { $exists: false } }, { dataFim: null }]
		});
		res.status(200).json(virus);
	} catch (err) {
		res.status(500).json({error: 'Erro ao buscar surtos ativos', details: err});
	}
};

exports.getSurtosOcorridosByVirus = async function(req, res) {
	console.log("GET:api/virus/ Surtos ativos por virus: " + req.params.cv);
	try {
		const virus = await SurtoModel.find({
			codigoVirus: req.params.cv,
			dataFim: { $exists: true, $ne: null }
		});
		res.status(200).json(virus);
	} catch (err) {
		res.status(500).json({error: 'Erro ao buscar surtos ativos', details: err});
	}
};
 

exports.updateFinalDateSurto = async function(req, res) {
	try {
		const { dataFim } = req.body;
		const { cp, cv } = req.params;
		const updatedSurto = await SurtoModel.findOneAndUpdate(
			{ codigoZona: cp, codigoSurto: cv },
			{ dataFim: new Date(dataFim) },
			{ new: true }
		);
		if (!updatedSurto) {
			return res.status(404).json({ error: 'Surto não encontrado' });
		}
		res.status(200).json({ message: 'Data de fim atualizada', surto: updatedSurto });
	} catch (err) {
		res.status(500).json({ error: 'Erro ao atualizar data de fim', details: err.message });
	}
};