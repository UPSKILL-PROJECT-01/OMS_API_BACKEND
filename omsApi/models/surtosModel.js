const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
		ref: 'Zona',
		required: true
	},
	dataDeteccao: {
		type: Date,
		required: true,
		validate: [
			{
				validator: function(v) {
					return v < new Date();
				},
				message: props => `${props.value} is not a valid date or it is in the future.`
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
				message: props => `${props.value} is not a valid date, it is in the future, or it is before the detection date.`
			}
		]
	}
});

module.exports = mongoose.model('Surto', SurtoSchema)
