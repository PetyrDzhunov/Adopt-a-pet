const router = require('express').Router();
const { authentication: authorization } = require('../middlewares/authMiddlware');
const animalService = require('../services/animalService');

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
	res.json(animal)
});

router.patch('/:animalId', authorization, (req, res, next) => {
	// find an animal by id and update it (this is for edit);
	res.json({ ok: true });
});

router.post('/', authorization, async (req, res, next) => {
	let createdAnimal = await animalService.createAnimal(req);
	res.json(createdAnimal);
});


module.exports = router;


//"email": "dido@abv.bg",
//password :123456
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWI0OGVkMGViYjQxNWZkOGQxMTQ4NWUiLCJlbWFpbCI6ImRpZG9AYWJ2LmJnIiwiaWF0IjoxNjM5MjIzNTU3fQ.BPSwYD9eE1G-t0q12ytFFwwSeWARQNS-OU5Ts_Pcuto