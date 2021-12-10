const errorHandler = (err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message || 'Something went wrong!';

	if (process.env.NODE_ENV == 'development') {
		console.log(err)
	};

	res.status(status).json({ message: message, type: 'ERROR' });
};

module.exports = errorHandler;