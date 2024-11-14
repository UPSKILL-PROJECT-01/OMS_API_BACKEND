const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Esquema de Zona
 * 
 * @typedef {Object} Zona
 * @property {string} nome - O nome da zona. Deve conter apenas letras e espaços.
 * @property {string} codigoZona - O código da zona. Deve seguir o formato de duas letras maiúsculas seguidas de dois dígitos.
 * 
 */
const zonaSchema = new Schema({
	nome: {
		type: String,
		required: [true, 'Uma zona deve ter uma nome'],
		unique: true,
		validate: {
			validator: function (v) {
				return /^[A-Za-z\s]+$/.test(v);
			},
			message: props => `${props.value} não é um nome de zona válido!`
		}
	},
	codigoZona: {
		type: String,
		required: [true, 'Uma zona deve ter uma nome'],
		validate: {
			validator: function (v) {
				return /^[A-Z]{2}\d{2}$/.test(v);
			},
			message: props => `${props.value} não é um código de zona válido!`
		}
	}
	// paises: {
	// 	type: [{
	// 		type: String,
	// 		validate: {
	// 			validator: function (v) {
	// 				return /^[A-Z]{3}\d{2}$/.test(v);
	// 			},
	// 			message: props => `${props.value} não é um código de país válido!`
	// 		}
	// 	}],
	// 	validate: {
	// 		validator: function (v) {
	// 			return Array.isArray(v) && new Set(v).size === v.length;
	// 		},
	// 		message: props => `A lista de países contém duplicatas!`
	// 	}
	// }
})

const Zona = mongoose.model('Zona', zonaSchema);
module.exports = Zona;