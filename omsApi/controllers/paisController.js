const PaisModel = require('../models/paisModel');
const ZonaModel = require('../models/zonaModel');

exports.createCountry = async function (req, res) {
	console.log('POST /api/paises Create country - ' + JSON.stringify(req.body));
	const { nome, codigoPais, codigoZona, populacao, area } = req.body;
	try {
		const Zona = await ZonaModel.findOne({ codigoZona: codigoZona });
		if (!Zona) {
			return res.status(204).json({ message: `Zona: ${codigoZona} não encontrado.` });
		}
		const Pais = new PaisModel({
			nome: nome,
			codigoPais: codigoPais,
			codigoZona: codigoZona,
			populacao: populacao,
			area: area
		})
		await Pais.save();
		res.status(201).json({ message: `${nome} criado com sucesso.` });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Validation Error: ';
			for (field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({ error: errorMessage.trim() });
		}
		else {
			res.status(500).json({ error: 'Erro ao criar país.', details: err });
		}
	}
}

exports.getAll = async function (req, res) {
	console.log('GET /api/pises get All');
	try {
		const paises = await PaisModel.find();
		res.status(200).json(paises);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar países:', details: err });
	}
}

exports.getById = async function (req, res) {
	console.log('GET /api/pises/id/:id get by id: ' + req.params.id);
	try {
		const id = req.params.id;
		const pais = await PaisModel.findOne({ _id: id });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		res.status(200).json(pais);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar país:', details: err });
	}
}

exports.getByCode = async function (req, res) {
	console.log('GET /api/pises/codigoPais/:codigoPais get by codigoPais: ' + req.params.codigoPais);
	try {
		const code = req.params.codigoPais;
		const pais = await PaisModel.findOne({ codigoPais: code });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		res.status(200).json(pais);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar país:', details: err });
	}
}

exports.getByZoneCode = async function (req, res) {
	console.log('GET /api/pises/codigoZona/:codigoZona get by codigoZona: ' + req.params.codigoZona);
	try {
		const code = req.params.codigoZona;
		const pais = await PaisModel.findOne({ codigoZona: code });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		res.status(200).json(pais);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar país:', details: err });
	}
}

exports.getByName = async function (req, res) {
	console.log('GET /api/pises/nome/:nome get by Name: ' + req.params.nome);
	try {
		const code = req.params.nome;
		const pais = await PaisModel.findOne({ nome: code });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		res.status(200).json(pais);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao consultar país:', details: err });
	}
}


exports.updateCountry = async function (req, res) {
	console.log('PUT /api/paises/id/:id atualizar País - ' + JSON.stringify(req.body));
	const { nome, codigoPais, codigoZona, populacao, area } = req.body;
	try {
		const id = req.params.id;
		const pais = await PaisModel.findOne({ _id: id });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		pais.nome = nome;
		pais.codigoPais = codigoPais;
		pais.codigoZona = codigoZona;
		pais.populacao = populacao;
		pais.area = area;
		await pais.save();
		res.status(200).json({ message: `País - ${nome} - atualizado com sucesso.` });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Validation Error: ';
			for (field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({ error: errorMessage.trim() });
		}
		else {
			res.status(500).json({ error: 'Erro ao atualizar país.', details: err });
		}
	}
}

exports.deleteCountry = async function (req, res) {
	console.log('DELETE /api/paises/id/:id Deletar país - ' + req.params.id);
	try {
		const id = req.params.id;
		const pais = await PaisModel.deleteOne({ _id: id });
		if (!pais) {
			res.status(204).json({ message: 'País não encontrado' });
		}
		res.status(200).json({ message: `País deletado.` });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Validation Error: ';
			for (field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({ error: errorMessage.trim() });
		}
		else {
			res.status(500).json({ error: 'Erro ao deletar país.', details: err });
		}
	}
}

