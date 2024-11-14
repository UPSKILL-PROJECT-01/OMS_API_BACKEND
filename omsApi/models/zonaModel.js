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
	},
})

const Zona = mongoose.model('Zona', zonaSchema);
module.exports = Zona;