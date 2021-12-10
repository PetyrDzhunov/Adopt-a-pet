function parseError(err) {
	if (err.name == 'ValidationError') { // so the error came from mongoose
		return Object.values(err.errors).map(e => e.properties.message);
	} else {
		return [err.message]
	};
};

module.exports = {
	parseError
}