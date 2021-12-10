const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/errorHandler');
const routes = require('../routes');

module.exports = (app) => {

	app.use(express.urlencoded({ extended: true }));

	app.use(cors());

	app.use(express.json());

	app.use('/api', routes);

	// auth middleware

	// static files
	app.use(errorHandler);
};