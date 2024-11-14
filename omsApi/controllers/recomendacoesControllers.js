// recomendacoesControllers.js

const recomendacoesModel = require('../models/recomendacoesModels');
const paisModel = require('../models/paisModel');
const zonaModel = require('../models/zonaModel');

exports.createRecomendacoes = async(req, res) => {
	const { codigoRecomendacao, codigoZona, dataNota, validade } = req.body;
	try {
		const recomendacao = new recomendacoesModel({
			codigoRecomendacao,
			codigoZona,
			dataNota,
			validade
		});
		await recomendacao.save();
		res.status(201).json({ message: 'Recomendação criada!' });
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Erro de validação: ';
			for (let field in err.errors) {
				errorMessage += `${err.errors[field].message} `;
			}
			res.status(400).json({ error: errorMessage.trim() });
		} else if (err.code === 11000) {
			res.status(400).json({ error: 'Código de Recomendação duplicado. Por favor use valores únicos.' });
		} else {
			res.status(500).json({ error: 'Erro ao salvar a recomendação', details: err.message });
		}
	}
}

// PARA TESTE -> PARA ELIMINAR
exports.getAllRecomendacoes = async function(req, res) {
	try {
		const recomendacoes = await recomendacoesModel.find();
		res.status(200).json(recomendacoes);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao recuperar recomendações', details: err.message });
	}
};

// Para verificar as recomendações ativas
const filterActiveRecomendacoes = (recomendacoes) => {
	const currentDate = new Date();
	return recomendacoes.filter(recomendacao => {
		const expirationDate = new Date(recomendacao.dataNota);
		expirationDate.setDate(expirationDate.getDate() + recomendacao.validade);
		console.log(`Recomendação: ${recomendacao.codigoRecomendacao}, Data Nota: ${recomendacao.dataNota}, Validade: ${recomendacao.validade}, Data Validade Calculada: ${expirationDate}`);
		return currentDate <= expirationDate;
	});
};

exports.getRecomendacoesByPais = async function(req, res) {
	console.log("GET:/api/paises/recomendacoes by codigoPais: " + req.params.codigoPais);
	try {
		const pais = await paisModel.findOne({ codigoPais: req.params.codigoPais });
		console.log(`codigoPais: ${req.params.codigoPais}`); 
		if (!pais) {
			console.log(`codigoPais ${req.params.codigoPais} não existe.`);
			return res.status(204).send();
		}
		const zona = pais.codigoZona;
		console.log(`codigoZona: ${zona}`); 
		const recomendacoes = await recomendacoesModel.find({ codigoZona: zona });
		console.log(`Recomendações encontradas: ${recomendacoes.length}`); 
		const activeRecomendacoes = filterActiveRecomendacoes(recomendacoes);
		console.log(`Recomendações ativas encontradas: ${activeRecomendacoes.length}`); 
		res.status(200).json(activeRecomendacoes);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao procurar recomendações', details: err });
	}
};


exports.updateRecomendacoes = async function(req, res) {
	const { codigoRecomendacoes } = req.params;
	const { codigoZona, dataNota, validade } = req.body;
	try {
		const recomendacao = await recomendacoesModel.findOneAndUpdate(
			{ codigoRecomendacao: codigoRecomendacoes },
			{ codigoZona, dataNota, validade },
			{ new: true, runValidators: true }
		);
		if (!recomendacao) {
			return res.status(404).json({ error: 'Recomendação não encontrada' });
		}
		res.status(200).json(recomendacao);
	} catch (err) {
		if (err.name === 'ValidationError') {
			let errorMessage = 'Erro de validação: ';
			for (let field in err.errors) {
				errorMessage += `${err.errors[field].message} `;
			}
			res.status(400).json({ error: errorMessage.trim() });
		} else {
			res.status(500).json({ error: 'Erro ao atualizar a recomendação', details: err.message });
		}
	}
};





// exports.getRecomendacoesByPais = async function(req, res) {
// 	console.log("GET:/api/paises/recomendacoes by codigoPais: " + req.params.codigoPais);
// 	try {
// 		const pais = await paisModel.findOne({codigoPais: req.params.codigoPais});
// 		console.log(`codigoPais: ${req.params.codigoPais}`); 
// 		if (!pais) {
// 			console.log(`codigoPais ${req.params.codigoPais} não existe.`);
// 			return res.status(204).send();
// 		}
// 		const zona = pais.codigoZona;
// 		console.log(`codigoZona: ${zona}`); 
// 		const recomendacoes = await recomendacoesModel.find({ codigoZona: zona });
// 		console.log(`Recomendações encontradas: ${recomendacoes.length}`); 

// 		const activeRecomendacoes = recomendacoes.filter(recomendacao => {
// 			const currentDate = new Date();
// 			const expirationDate = new Date(recomendacao.dataNota);
// 			expirationDate.setDate(expirationDate.getDate() + recomendacao.validade);
// 			console.log(`Recomendação: ${recomendacao.codigoRecomendacao}, Data Nota: ${recomendacao.dataNota}, Validade: ${recomendacao.validade}, Data Validade Calculada: ${expirationDate}`);
// 			return currentDate <= expirationDate;
// 		});
// 		console.log(`Recomendações ativas encontradas: ${activeRecomendacoes.length}`); 

// 		res.status(200).json(activeRecomendacoes);
// 	} catch (err) {
// 		res.status(500).json({error: 'Erro ao procurar recomendações', details: err});
// 	}
// };









// exports.getRecomendacaoStatus = async function(req, res) {
//     const { codigoRecomendacao } = req.params;
//     console.log(`Searching for recomendacao with codigoRecomendacao: ${codigoRecomendacao}`);
//     try {
//         const recomendacao = await recomendacoesModel.findOne({ codigoRecomendacao });
//         if (!recomendacao) {
//             console.log(`Recomendacao with codigoRecomendacao: ${codigoRecomendacao} not found`);
//             return res.status(404).json({ error: 'Recomendação não encontrada' });
//         }
//         res.status(200).json({ status: recomendacao.status });
//     } catch (err) {
//         console.log(`Error retrieving recomendacao: ${err.message}`);
//         res.status(500).json({ error: 'Erro ao recuperar a recomendação', details: err.message });
//     }
// };




// exports.getRecomendacoesAtivas = async function(req, res) {
// 	console.log("GET:/api/recomendacoes/ Recomendações ativas por paises: " + req.params.cp);
// 	try {
// 		const recomendacao = await recomendacoesModel.find({
// 			codigoRecomendacao: req.params.cp,
// 			$or: [{ dataValidade: { $exists: false } }, { dataValidade: null }]
// 		});
// 		res.status(200).json(recomendacao);
// 	} catch (err) {
// 		res.status(500).json({error: 'Erro ao buscar recomendações ativas', details: err});
// 	}
// };


/*
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


*/










// teste
// exports.getRecomendacoesByPais = async function(req, res) {
//     const { codigoPais } = req.params;
//     try {

//     } catch (err) {
//         res.status(500).json({ error: 'Erro ao recuperar recomendações', details: err.message });
//     }
// };

// exports.getRecomendacoesByPais = async function(req, res) {
//     const { codigoPais } = req.params;
//     try {
//         const recomendacoes = await recomendacoesModel.find({ codigoPais });
//         const activeRecomendacoes = recomendacoes.filter(recomendacao => {
//             const currentDate = new Date();
//             return currentDate <= recomendacao.dataValidade;
//         });
//         res.status(200).json(activeRecomendacoes);
//     } catch (err) {
//         res.status(500).json({ error: 'Erro ao recuperar recomendações', details: err.message });
//     }
// };


// exports.updateRecomendacoes = async function(req, res) {
//     const { codigoRecomendacoes } = req.params;
//     const { codigoZona, dataNota, validade } = req.body;
//     try {
//         const recomendacao = await recomendacoesModel.findOneAndUpdate(
//             { codigoRecomendacao: codigoRecomendacoes },
//             { codigoZona, dataNota, validade },
//             { new: true, runValidators: true }
//         );
//         if (!recomendacao) {
//             return res.status(404).json({ error: 'Recomendação não encontrada' });
//         }
//         res.status(200).json(recomendacao);
//     } catch (err) {
//         if (err.name === 'ValidationError') {
//             let errorMessage = 'Erro de validação: ';
//             for (let field in err.errors) {
//                 errorMessage += `${err.errors[field].message} `;
//             }
//             res.status(400).json({ error: errorMessage.trim() });
//         } else {
//             res.status(500).json({ error: 'Erro ao atualizar a recomendação', details: err.message });
//         }
//     }
// };