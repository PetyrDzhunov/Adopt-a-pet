const router = require('express').Router();
const { authentication: authorization } = require('../middlewares/authMiddlware');
const animalService = require('../services/animalService');
const { check, validationResult } = require('express-validator');
const HttpError = require('../models/Http-error');

router.get('/', async (req, res) => {
	const animals = await animalService.getAllAnimals();
	res.json({ animals });
});

router.get('/dogs', async (req, res, next) => {
	let error;
	let dogs;
	try {
		dogs = await animalService.getAllDogs();
		if (dogs.length === 0) {
			error = new HttpError('There are no dogs for adoption.', 500);
			return next(error)
		};
	} catch (err) {
		error = new HttpError('Something went wrong, please try again.');
		return next(error);
	};
	res.json({ dogs })
});

router.get('/cats', async (req, res, next) => {
	let error;
	let cats;
	try {
		cats = await animalService.getAllCats();
		if (cats.length === 0) {
			error = new HttpError('There are no cats for adoption.', 500);
			return next(error)
		};
	} catch (err) {
		error = new HttpError('Something went wrong, please try again.');
		return next(error);
	};
	res.json({ cats })
});

router.get('/:animalId', async (req, res, next) => {
	const animal = await animalService.getAnimalById(req.params.animalId);
	res.json(animal);
});

router.patch('/:animalId',
	[
		check('name').not().isEmpty(),
		check('gender').not().isEmpty(),
		check('species').not().isEmpty(),
		check('age').not().isEmpty(),
		check('neutered').not().isEmpty(),
	],
	authorization,
	async (req, res, next) => {
		let updatedAnimal;

		try {
			updatedAnimal = await animalService.updateAnimal(req);
		} catch (error) {
			return next(error);
		};

		res.json(updatedAnimal);
	});



router.post('/',
	[
		check('name').not().isEmpty(),
		check('gender').not().isEmpty(),
		check('species').not().isEmpty(),
		check('age').not().isEmpty(),
		check('neutered').not().isEmpty(),
	],
	authorization, async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(
				new HttpError('Invalid inputs passed, please check your data.', 422)
			);
		};

		let createdAnimal;
		try {
			createdAnimal = await animalService.createAnimal(req);
		} catch (err) {
			return next(err);
		};

		res.json(createdAnimal);
	});

// const error = new HttpError('Invalid inputs, please fill all the required fields!', 500);
// throw error;


module.exports = router;
// http://localhost:3030/api/animals/61b4be51dfbe2714a2619743

// {
// 	"name":"Stelko",
// 	"gender":"female",
// 	"species" : "cat",
// 	"age": 6,
// 	"neutered": "yes"
//  }
