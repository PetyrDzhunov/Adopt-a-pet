const router = require('express').Router();

router.get('/', (req, res) => {
	//return all the animals here as a json;
	res.json({ animals: [] });
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

router.patch('/:animalId', (req, re, next) => {
	// find an animal by id and update it (this is for edit);
});

router.post('/api/animals', (req, res, next) => {
	//this is for adding an animal for adoption;
});




module.exports = router;