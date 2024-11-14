// recomendacoesControllers.js

const recomendacoesModel = require('../models/recomendacoesModels');

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

exports.getRecomendacaoStatus = async function(req, res) {
    const { codigoRecomendacao } = req.params;
    console.log(`Searching for recomendacao with codigoRecomendacao: ${codigoRecomendacao}`);
    try {
        const recomendacao = await recomendacoesModel.findOne({ codigoRecomendacao });
        if (!recomendacao) {
            console.log(`Recomendacao with codigoRecomendacao: ${codigoRecomendacao} not found`);
            return res.status(404).json({ error: 'Recomendação não encontrada' });
        }
        res.status(200).json({ status: recomendacao.status });
    } catch (err) {
        console.log(`Error retrieving recomendacao: ${err.message}`);
        res.status(500).json({ error: 'Erro ao recuperar a recomendação', details: err.message });
    }
};


// teste
exports.getRecomendacoesByPais = async function(req, res) {
    const { codigoPais } = req.params;
    try {
        const recomendacoes = await recomendacoesModel.find({ codigoPais });
        const activeRecomendacoes = recomendacoes.filter(recomendacao => {
            const currentDate = new Date();
            return currentDate <= recomendacao.dataValidade;
        });
        res.status(200).json(activeRecomendacoes);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao recuperar recomendações', details: err.message });
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