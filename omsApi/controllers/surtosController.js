const SurtoModel = require('../models/surtosModel');
const ZonaModel = require('../models/zonaModel');
const PaisModel = require('../models/paisModel');

exports.createSurto = async function (req, res) {
	console.log("POST: /api/surtos - " + JSON.stringify(req.body));
	const { codigoSurto, codigoVirus, codigoZona, dataDeteccao, dataFim } = req.body;

	try {
		const parsedDataDeteccao = parseDateString(dataDeteccao);
		if (!parsedDataDeteccao) {
			return res.status(400).json({ error: 'dataDeteccao não é válida ou está no formato incorreto (deve ser dd/MM/yyyy).' });
		}
		let parsedDataFim = null;
		if (dataFim) {
			parsedDataFim = parseDateString(dataFim);
			if (!parsedDataFim) {
				return res.status(400).json({ error: 'dataFim não é válida ou está no formato incorreto (deve ser dd/MM/yyyy).' });
			}
			if (parsedDataFim < parsedDataDeteccao) {
				return res.status(400).json({ error: 'dataFim não pode ser anterior a dataDeteccao.' });
			}
		}
		const surto = new SurtoModel({
			codigoSurto,
			codigoVirus,
			codigoZona,
			dataDeteccao: parsedDataDeteccao,
			dataFim: parsedDataFim
		});

		await surto.save();
		res.status(201).json({ message: 'Surto criado!', surto: surto });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Erro de Validação: ';
			for (let field in err.errors) {
				errorMessage += `${err.errors[field].message}`;
			}
			res.status(400).json({ error: errorMessage.trim() });
		} else if (err.code === 11000) {
			res.status(400).json({ error: 'Código de surto duplicado. Por favor use valores únicos.' });
		} else {
			res.status(500).json({ error: 'Erro ao salvar Surto', details: err.message });
		}
	}
}

function parseDateString(dateString) {
	if (!dateString)
		return null;
	const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
	if (!datePattern.test(dateString)) {
		return null;
	}
	const parts = dateString.split('/');
	const day = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10) - 1;
	const year = parseInt(parts[2], 10);
	// if (year < 100) {
	// 	return null;
	// }
	const date = new Date(year, month, day);
	if (
		date.getFullYear() === year &&
		date.getMonth() === month &&
		date.getDate() === day
	) {
		return date;
	}
	return null;
}

exports.getSurtosByPais = async function (req, res) {
	console.log("GET:/api/paises/surtos by codigoPais: " + req.params.cp);
	try {
		const pais = await PaisModel.findOne({ codigoPais: req.params.cp });
		if (!pais)
			return res.status(404).json({ message: `codigoPais ${req.params.cp} não existe.` });
		const zona = pais.codigoZona;
		const surtos = await SurtoModel.find({ codigoZona: zona });
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao buscar surtos', details: err });
	}
};

exports.getSurtosAtivosByVirus = async function (req, res) {
	console.log("GET:api/virus/ Surtos ativos por virus: " + req.params.cv);
	try {
		const virus = await SurtoModel.find({
			codigoVirus: req.params.cv,
			$or: [{ dataFim: { $exists: false } }, { dataFim: null }]
		});
		res.status(200).json(virus);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao buscar surtos ativos', details: err });
	}
};

exports.getSurtosOcorridosByVirus = async function (req, res) {
	console.log("GET:api/virus/ Surtos ativos por virus: " + req.params.cv);
	try {
		const virus = await SurtoModel.find({
			codigoVirus: req.params.cv,
			dataFim: { $exists: true, $ne: null }
		});
		res.status(200).json(virus);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao buscar surtos ativos', details: err });
	}
};

exports.updateFinalDateSurto = async function (req, res) {
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

exports.allSurtosByZone = async function (req, res) {
	console.log("GET:api/virus//virus/zona/:cz Todos os surtos para a zona: " + req.params.cz);
	const codigoZona = req.params.cz;
	try {
		const surtos = await SurtoModel.find({ codigoZona: codigoZona });
		if (!surtos) {
			return res.status(404).json({ message: `Não existem surtos registados para a zona ${codigoZona}.` })
		}
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: `Erro ao buscar surtos para zona ${codigoZona}`, details: err.message });
	}
}

exports.SurtosAtivosByZone = async function (req, res) {
	console.log("GET:api/virus//virus/zona/:cz/ativos Surtos ATIVOS para a zona: " + req.params.cz);
	const codigoZona = req.params.cz;
	try {
		const surtos = await SurtoModel.find({ codigoZona: codigoZona, dataFim: null });
		if (!surtos) {
			return res.status(404).json({ message: `Não existem surtos ATIVOS registados para a zona ${codigoZona}.` })
		}
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: `Erro ao buscar surtos ATIVOS para zona ${codigoZona}`, details: err.message });
	}
}

exports.SurtosOcorridosByZone = async function (req, res) {
	console.log("GET:api/virus//virus/zona/:cz/ativos Surtos OCORRIDOS para a zona: " + req.params.cz);
	const codigoZona = req.params.cz;
	try {
		const surtos = await SurtoModel.find({ codigoZona: codigoZona, dataFim: { $ne: null } });
		if (!surtos) {
			return res.status(404).json({ message: `Não existem surtos OCORRIDOS registados para a zona ${codigoZona}.` })
		}
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: `Erro ao buscar surtos OCORRIDOS para zona ${codigoZona}`, details: err.message });
	}
}

exports.SurtosAtivosByPais = async function (req, res) {
	console.log("GET:api/virus//virus/zona/:cp/ativos Surtos ATIVOS para o país: " + req.params.cp);
	const codigoPais = req.params.cp;
	try {
		const surtos = await SurtoModel.find({ codigoPais: codigoPais, dataFim: null });
		if (!surtos) {
			return res.status(404).json({ message: `Não existem surtos ATIVOS registados para o país ${codigoPais}.` })
		}
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: `Erro ao buscar surtos ATIVOS paro país ${codigoPais}`, details: err.message });
	}
}

exports.SurtosOcorridosByPais = async function (req, res) {
	console.log("GET:api/virus//virus/zona/:cp/ativos Surtos OCORRIDOS para o país: " + req.params.cp);
	const codigoPais = req.params.cp;
	try {
		const surtos = await SurtoModel.find({ codigoPais: codigoPais, dataFim: { $ne: null } });
		if (!surtos) {
			return res.status(404).json({ message: `Não existem surtos OCORRIDOS registados para o país ${codigoPais}.` })
		}
		res.status(200).json(surtos);
	} catch (err) {
		res.status(500).json({ error: `Erro ao buscar surtos OCORRIDOS paro país ${codigoPais}`, details: err.message });
	}
}
