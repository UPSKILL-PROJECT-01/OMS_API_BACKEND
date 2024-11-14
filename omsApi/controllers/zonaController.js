var ZonaModel = require('../models/zonaModel');

exports.createZone = async function (req, res) {
	console.log('PUT /api/zonas/id/:id update zone - ' + JSON.stringify(req.bofy));
	try {
		const {nome, codigoZona} = req.body;
		var Zona =  new ZonaModel({
			nome : nome,
			codigoZona: codigoZona
		})
		await Zona.save();
		res.status(201).json({message: `Zona ${nome} criada com sucesso.`});
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar zonas:', details: err });
	}
}

exports.getAll = async function (req, res) {
	console.log('GET /api/zonas get all');
	try {
		const zonas = await ZonaModel.find();
		res.status(200).json(zonas);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar zonas:', details: err });
	}
}

exports.getById = async function (req, res) {
	console.log('GET /api/zonas/id/:id get by Id: ' + req.params.id);
	try {
		const zona = await ZonaModel.findOne({_id:req.params.id});
		if (!zona) {
			return res.status(204).json({message: 'Zona não encontrada'});
		}
		res.status(200).json(zona);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar zonas:', details: err });
	}
}

exports.getByName = async function (req, res) {
	console.log('GET /api/zonas/nome/:nome get by Id: ' + req.params.nome);
	try {
		const zona = await ZonaModel.findOne({nome:req.params.nome});
		if (!zona) {
			return res.status(204).json({message: 'Zona não encontrada'});
		}
		res.status(200).json(zona);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar zonas:', details: err });
	}
}

exports.getByCode = async function (req, res) {
	console.log('GET /api/zonas/codigoZona/:codigoZona get by code: ' + req.params.nocodigoZoname);
	try {
		const zona = await ZonaModel.findOne({codigoZona:req.params.codigoZona});
		if (!zona) {
			return res.status(204).json({message: 'Zona não encontrada'});
		}
		res.status(200).json(zona);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar zonas:', details: err });
	}
}

exports.updateZone = async function (req, res) {
	console.log('POST /api/zonas create zone - ' + JSON.stringify(req.bofy));
	try {
		const {nome, codigoZona} = req.body;
		const Zona = await ZonaModel.findOne({_id:req.params.id});
		if (!Zona) {
			return res.status(204).json({message: 'Zona não encontrada'});
		}
		Zona.nome = nome;
		Zona.codigoZona = codigoZona;
		await Zona.save();
		res.status(200).json({message: `Zona ${nome} atualizada com sucesso.`});
	} catch (err) {
		res.status(500).json({ message: 'Erro ao atualizar zonas:', details: err });
	}
}

exports.deleteZone = async function (req, res) {
	console.log('DELETE /api/zonas/id/:id Deletar zona - ' + req.params.id);
	try {
		const id = req.params.id;
		const zona = await ZonaModel.deleteOne({ _id: id });
		if (!zona) {
			res.status(204).json({ message: 'zona não encontrada' });
		}
		res.status(200).json({ message: `zona deletada.` });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Validation Error: ';
			for (field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({ error: errorMessage.trim() });
		}
		else {
			res.status(500).json({ error: 'Erro ao deletar zona.', details: err });
		}
	}
}
