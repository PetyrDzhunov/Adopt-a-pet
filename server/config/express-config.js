const express = require('express');
const cors = require('cors');
const errorHandler = require('../middlewares/errorHandler');
const routes = require('../routes');
const { authentication } = require('../middlewares/authMiddlware');

module.exports = (app) => {

	app.use(express.urlencoded({ extended: true }));

	app.use(cors());

	app.use(express.json());

	app.use(authentication);

	app.use('/api', routes);


	// static files
	app.use(errorHandler);
};