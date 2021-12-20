const jwt = require('../util/jwt');
const { JWT_KEY } = require('../config/constants');
const HttpError = require('../models/Http-error');

const authentication = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			throw new Error('Unauthorized');
		};
		const decodedToken = await jwt.verify(token, JWT_KEY);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Unauthorized', 403);
		return next(error);
	};
};


module.exports = {
	authentication,
}