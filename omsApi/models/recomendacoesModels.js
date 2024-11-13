// recomendacoesModels.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const codigoZona = require('./zonaModel');

const RecomendacoesSchema = new Schema({
	codigoRecomendacao: {
		type: String,
		required: true,
		unique: true,
		match: /^[R]{1}[0-9]{6}$/,
		minlength: 7,
		maxlength: 7
	},
	codigoZona: {
		type: String,
		required: true,
		// validate: {
		// 	validator: async function(value) {
		// 		const zona = await Zona.findOne({ codigoZona: value });
		// 		return !!zona;
		// 	},
		// 	message: 'Código da zona não foi encontrado'
		// }
	},
	dataNota: {
		type: Date,
		default: Date.now, // Set to current date and time
		validate: {
			validator: function(value) {
				return value <= new Date();
			},
			message: 'dataNota não pode ser maior que a data atual'
		}
	},

	// dataNota: {
	//     type: Date,
	//     required: true,
	//     set: function(value) {
	//         const date = new Date(value);
	//         if (value && value.includes('T')) {
	//             return date;
	//         } else {
	//             const localDate = new Date();
	//             date.setHours(localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds());
	//             return date;
	//         }
	//     },
	//     validate: {
	//         validator: function(value) {
	//             return value <= new Date();
	//         },
	//         message: 'dataNota não pode ser maior que a data atual'
	//     }
	// },
	validade: {
		type: Number,
		default: 30 
	},
	dataValidade: {	
		type: Date,
	}

}, { collection: 'recomendacoes'});

// Method to check if the recommendation is valid
RecomendacoesSchema.pre('save', function(next) {
	if (!this.dataNota) {
		this.dataNota = new Date();
	}
	const expiryDate = new Date(this.dataNota);
	expiryDate.setDate(expiryDate.getDate() + this.validade);
	this.dataValidade = expiryDate;
	console.log(`dataNota: ${this.dataNota}, dataValidade: ${this.dataValidade}`);
	next();
});

// Virtual field to get the status
RecomendacoesSchema.virtual('status').get(function() {
	const currentDate = new Date();
	console.log(`currentDate: ${currentDate}, dataValidade: ${this.dataValidade}`);
	return currentDate <= this.dataValidade ? 'active' : 'inactive';
});

// Method to check if the recommendation is valid
RecomendacoesSchema.methods.isValid = function() {
	const currentDate = new Date();
	return currentDate <= this.dataValidade;
};

module.exports = mongoose.model('Recomendacoes', RecomendacoesSchema);
