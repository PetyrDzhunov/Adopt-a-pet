const Animal = require('../models/Animal');
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');

const createAnimal = async (params) => {
	const { name, gender, age, image, neutered, description, additionalInfo, species } = params;
	if (name == '' || !gender || !age || !neutered || !species) {
		const error = new HttpError('Invalid inputs, please fill all the required fields!', 500);
		throw error;
	};

	let creator;

	try {
		creator = await User.findOne({ _id: req.userData.userId });
	} catch (err) {
		const error = new HttpError('Could not find a user with the ID you provided.');
		throw error;
	};

	const createdAnimal = new Animal({ name, gender, age, image, neutered, description, additionalInfo, species, owner: req.userData.userId });

	creator.animalsOwned.push(createdAnimal);

	try {
		await createdAnimal.save();
		await creator.save();
	} catch (err) {
		let error = new HttpError('Could not create the animal, please try again later.', 500);
		throw error;
	};
	return createdAnimal;
};

const getAllAnimals = () => {
	return Animal.find({})
};

const getAllDogs = () => {
	return Animal.find({ species: 'dog' });
};


const getAllCats = () => {
	return Animal.find({ species: 'cat' });
};

const getAnimalById = (id) => {
	return Animal.find({ _id: id });
};

const updateAnimal = async (req) => {
	const animalId = req.params.animalId;
	const params = req.body;
	console.log(params);
	let animal;
	try {
		animal = await Animal.find({ _id: animalId });
	} catch (err) {
		const error = new HttpError('Could not find animal for the provided id', 500);
		throw error;
	};
};


module.exports = {
	createAnimal,
	getAllAnimals,
	getAllDogs,
	getAllCats,
	getAnimalById,
	updateAnimal
};

