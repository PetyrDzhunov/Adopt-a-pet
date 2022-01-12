const router = require('express').Router();
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');
const jwt = require('../util/jwt');
const { JWT_KEY } = require('../config/constants');
const { check, validationResult } = require('express-validator');
const { login } = require('../services/authService');
const { authentication } = require('../middlewares/authMiddlware');


router.post('/register',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 })
	],
	async (req, res, next) => {
		const errors = validationResult(req.body);
		console.log(errors);
		if (!errors.isEmpty()) {
			return next(
				new HttpError('Invalid inputs passed, please check your data.', 422)
			);
		};
		const { name, email, password, phoneNumber, facebookURL } = req.body.userData;
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

		//fix errorHandling ...(mongoose or express-validator)?
		try {
			await createdUser.save();
		} catch (err) {
			const mongooseError = parseError(err);
			console.log(mongooseError);
			let error;
			if (mongooseError) {
				error = new HttpError('Email is already in use. Please try again', 500)
				return next(error);
			} else {
				error = new HttpError('Could not create the user, please try again later.', 500);
				return next(error);
			};
		};

		let token = await jwt.sign({ userId: createdUser._id, email: createdUser.email }, JWT_KEY);

		if (!token) {
			const error = new HttpError('Signing up failed, please try again', 500);
			return next(error);
		};

		res.status(201).json({ userId: createdUser._id, email: createdUser.email, token });
	});


router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		userData = await login({ email, password });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Email or password are invalid!', 401);
		return next(error);
	};
	res.json(userData);
});

router.get('/:userId/animals', (req, res, next) => {
	// find all animals for a user and return them to the client
	res.json({ ok: true });

});

module.exports = router;