const express = require('express');
const cors = require('cors');

module.exports = (app) => {

	app.use(express.urlencoded({ extended: true }));

	app.use(cors());

	app.use(express.json());

	// auth middleware

	// static files
};