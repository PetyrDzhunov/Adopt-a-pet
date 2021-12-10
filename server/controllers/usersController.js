const router = require('express').Router();
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');

router.post('/register', async (req, res, next) => {
	// on this route users will register

	// get data from the client and validate it;
	const { name, email, password, phoneNumber, facebookURL } = req.body;

	const createdUser = new User({ name, email, password, phoneNumber, facebookURL });

	try {
		await createdUser.save();
	} catch (err) {
		const mongooseError = parseError(err)[0];
		let error;
		if (mongooseError) {
			error = new HttpError('Email is already in use. Please try again.', 500)
			return next(error);
		} else {
			error = new HttpError('Could not create the user, please try again later.', 500);
			return next(error);
		}
	};
	res.json({ user: createdUser });
});


router.post('/login', (req, res, next) => {
	// on this route users will login;
	res.json({ ok: true });

});

router.get('/:userId/animals', (req, res, next) => {
	// find all animals for a user and return them to the client
	res.json({ ok: true });

});

module.exports = router;