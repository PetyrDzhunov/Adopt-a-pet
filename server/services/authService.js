const jwt = require('../util/jwt');

const User = require('../models/User');
const { JWT_KEY } = require('../config/constants');

exports.login = async ({ email, password }) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Invalid username or password');
	};

	let isValid = await user.validatePassword(password);
	if (!isValid) {
		throw new Error('Invalid credentials, could not log you in.');
	};

	const payload = { userId: user._id, email: user.email };
	const token = await jwt.sign(payload, JWT_KEY);

	return { ...payload, token };
};