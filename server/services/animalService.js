const Animal = require('../models/Animal');
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');

const createAnimal = async (req, res, next) => {
	const { name, gender, age, image, neutered, description, additionalInfo, species } = req.body;

	let creator;

	try {
		creator = await User.findOne({ _id: req.userData.userId });
	} catch (err) {
		const error = new HttpError('Could not find a user with the ID you provided.');
		return next(error);
	};

	const createdAnimal = new Animal({ name, gender, age, image, neutered, description, additionalInfo, species, owner: req.userData.userId });

	creator.animalsOwned.push(createdAnimal);

	try {
		await createdAnimal.save();
		await creator.save();
	} catch (err) {
		console.log(err);
		let error = new HttpError('Could not create the animal, please try again later.', 500);
		return next(error);
	};

	return createdAnimal;
};

const getAllAnimals = async (req, res, next,) => {
	return Animal.find({})
};

const getAllDogs = async (req, res, next) => {
	return Animal.find({ species: 'dog' });
};

const getAllCats = async (req, res, next) => {
	return Animal.find({ species: 'cat' });
};


module.exports = {
	createAnimal,
	getAllAnimals,
	getAllDogs,
	getAllCats
};

