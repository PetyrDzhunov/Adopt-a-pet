const errorHandler = (err, req, res, next) => {
	let status = err.code || 500;
	let message = err.message || 'Something went wrong!';

	if (process.env.NODE_ENV == 'development') {
		console.log(err)
	};


	res.status(status).json({ message, status });
};

module.exports = errorHandler;