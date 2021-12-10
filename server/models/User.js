const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const { SALT_FOR_HASHING } = require('../config/constants');


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	facebookURL: {
		type: String,
	},
	animalsOwned: [{ type: mongoose.Types.ObjectId, ref: 'Animal', required: true }]
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', (next) => {

	bcrypt.hash(this.password, SALT_FOR_HASHING)
		.then((hashedPassword) => {
			this.password = hashedPassword;
		})
		.catch(err => next(err));

	next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
