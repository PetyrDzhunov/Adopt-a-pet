const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_FOR_HASHING } = require('../config/constants');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	phoneNumber: {
		type: String,
		required: true,
		trim: true
	},
	facebookURL: {
		type: String,
		trim: true
	},
	animalsOwned: [{ type: mongoose.Types.ObjectId, ref: 'Animal' }]
}, { timestamps: true });

userSchema.pre('save', function (next) {
	return bcrypt.hash(this.password, SALT_FOR_HASHING)
		.then(hash => {
			this.password = hash
			return next();
		});
});

userSchema.method('validatePassword', function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
