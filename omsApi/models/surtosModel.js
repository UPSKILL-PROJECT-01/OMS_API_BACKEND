const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Zona = require('../models/zonaModel');

const SurtoSchema = new Schema({
	codigoSurto: {
		type: String,
		match: [/^S\d{2,5}$/, 'codigoSurto deve começar com S e ter entre 3 e 6 caracteres'],
		unique: true,
		required: true
	},
	codigoVirus: {
		type: String,
		ref: 'Virus',
		required: true
	},
	codigoZona: {
		type: String,
		required: true,
		validate: {
			validator: async function(v) {
				const zona = await Zona.findOne({ codigoZona: v });
				return !!zona;
			},
			message: props => `${props.value} não é um codigoZona válido.`
		}
	},
	dataDeteccao: {
		type: Date,
		required: true,
		validate: [
			{
				validator: function(v) {
					return v < new Date();
				},
				message: props => `${props.value} não é uma data válida ou está no futuro.`
			}
		]
	},
	dataFim: {
		type: Date,
		required: false,
		validate: [
			{
				validator: function(v) {
					return !v || (v <= new Date() && v >= this.dataDeteccao);
				},
				message: props => `${props.value} não é uma data válida, está no futuro ou é anterior à data de detecção.`
			}
		]
	}
});

module.exports = mongoose.model('Surto', SurtoSchema)
