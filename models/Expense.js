const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		enum: ['food', 'transportation', 'bills', 'entertainment', 'other'], // küçük harf!
		default: 'other',
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Expense', expenseSchema);
