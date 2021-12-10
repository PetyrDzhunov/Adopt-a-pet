const jwt = require('../util/jwt');
const { JWT_KEY } = require('../config/constants');
const HttpError = require('../models/Http-error');

const authentication = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed!');
		};
		const decodedToken = await jwt.verify(token, JWT_KEY);
		console.log(decodedToken);
		next();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Authentication failed!', 403);
		return next(error);
	};
};


const isAuth = function (req, res, next) {
	if (req.user) {
		next();
	} else {
		const error = new HttpError('Unauthorized!', 403);
		return next(error);
	};
};


const isGuest = function (req, res, next) {
	if (!req.user) {
		next();
	} else {
		const error = new HttpError('You are already logged in!', 500);
		return next(error);
	};
};


module.exports = {
	authentication,
	isAuth,
	isGuest
}