const express = require('express');

const { PORT } = require('./config/constants');
const databaseConfig = require('./config/database-config');
const expressConfig = require('./config/express-config');

async function start() {
	const app = express();
	await databaseConfig(app);
	expressConfig(app);
	console.log('runnig');

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};
start();
