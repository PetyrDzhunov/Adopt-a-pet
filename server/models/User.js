const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SALT_FOR_HASHING } = require('../config/constants');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
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
	bcrypt.genSalt(SALT_FOR_HASHING)
		.then(salt => bcrypt.hash(this.password, salt))
		.then(hash => {
			this.password = hash
			next();
		});
});

userSchema.method('validatePassword', function (password) {
	return bcrypt.compare(password, this.password)
});

const User = mongoose.model('User', userSchema);
module.exports = User;
