const express = require('express');

const { PORT } = require('./config/constants');
const databaseConfig = require('./config/database-config');
const expressConfig = require('./config/express-config');
const HttpError = require('./models/Http-error');

async function start() {
	const app = express();

	try {
		await databaseConfig(app);
	} catch (err) {
		throw new Error(err);
	};


	expressConfig(app);

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};
start();
