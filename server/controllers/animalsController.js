const router = require('express').Router();
const { authentication: authorization } = require('../middlewares/authMiddlware');
const animalService = require('../services/animalService');

router.get('/', async (req, res) => {
	//return all the animals here as a json;
	const animals = await animalService.getAllAnimals();
	res.json({ animals });
});

router.get('/dogs', (req, res, next) => {
	// filter animals by species and return only the dogs;
	res.json({ dogs: [] })
});

router.get('/cats', (req, res, next) => {
	//filter animals by species and return only the cats;
	res.json({ cats: [] })

});

router.get('/:animalId', (req, res, next) => {
	//find a animal by id ( this is for details);
	res.json({ animal: 'animal' })
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