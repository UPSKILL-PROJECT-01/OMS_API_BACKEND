const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Esquema para o modelo "Pais" (País).
 * 
 * @typedef {Object} Pais
 * @property {string} codigoPais - O código único do país. Deve ser uma string de exatamente 3 letras maiúsculas seguidas de 2 dígitos.
 * @property {string} nomePais - O nome do país. Deve ser uma string contendo apenas letras e espaços.
 * @property {string} codigoZona - O código da zona à qual o país pertence. Deve ser uma string de exatamente 2 letras seguidas de 2 dígitos.
 * @property {number} [populacao] - A população do país (Quantidade de habitantes).
 * @property {number} [area] - A área do país (Área em Km^2).
 */
const paisSchema = new Schema({
	codigoPais: {
		type: String,
		unique: true,
		required: [true, 'Um país deve ter uma código'],
		validate: {
			validator: function (v) {
				return /^[A-Z]{3}\d{2}$/.test(v);
			},
			message: props => `${props.value} não é um código de país válido!`
		}
	},
	nome: {
		type: String,
		required: [true, 'Um país deve ter uma nome'],
		validate: {
			validator: function (v) {
				return /^[A-Za-z\s]+$/.test(v);
			},
			message: props => `${props.value} não é um nome de país válido!`
		}
	},
	codigoZona: {
		type: String,
		required: [true, 'Um país deve ter uma nome'],
		validate: {
			validator: function (v) {
				return /^[A-Z]{2}\d{2}$/.test(v);
			},
			message: props => `${props.value} não é um código de país válido!`
		}
	},
	populacao: Number,
	area: Number
})

const Pais = mongoose.model('Pais', paisSchema);
module.exports = Pais;