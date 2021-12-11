const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	gender: {
		type: String,
		trim: true,
		enum: ['female', 'male']
	},
	species: {
		type: String,
		enum: ['cat', 'dog'],
	},
	age: {
		type: Number,
		min: 0,
	},
	image: {
		type: String,
		trim: true
	},
	neutered: {
		type: String,
		enum: ['yes', 'no']
	},
	description: {
		type: String,
		maxlength: 100,
		trim: true,
	},
	additionalInfo: {
		type: String,
		maxlength: 100,
		trim: true,
	},
	owner: { type: mongoose.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;


