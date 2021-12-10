const router = require('express').Router();
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');
const jwt = require('../util/jwt');
const { JWT_KEY } = require('../config/constants');
const { check, validationResult } = require('express-validator');

router.post('/register',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 })
	],
	async (req, res, next) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(
				new HttpError('Invalid inputs passed, please check your data.', 422)
			);
		};

		const { name, email, password, phoneNumber, facebookURL } = req.body;

		let existingUser;

		try {
			existingUser = await User.findOne({ email });
		} catch (err) {
			const error = new HttpError(
				'Signing up failed, please try again later.',
				500
			);
			return next(error);
		};

		if (existingUser) {
			const error = new HttpError(
				'User exists already, please login instead.',
				422
			);
			return next(error);
		};

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
			};
		};

		let token = await jwt.sign({ userId: createdUser._id, email: createdUser.email }, JWT_KEY, { expiresIn: '1h' })

		if (!token) {
			const error = new HttpError('Signing up failed, please try again', 500);
			return next(error);
		};

		res.status(201).json({ userId: createdUser._id, email: createdUser.email, token });
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