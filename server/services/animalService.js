const Animal = require('../models/Animal');
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const { parseError } = require('../util/parsers');

const createAnimal = async (req) => {
	const { name, gender, age, image, neutered, description, additionalInfo, species } = req.body;

	let creator;

	try {
		creator = await User.findOne({ _id: req.userData.userId });
	} catch (err) {
		const error = new HttpError('Could not find a user with the ID you provided.', 500);
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

	let authUser;
	try {
		authUser = await User.findOne({ _id: req.userData.userId });
	} catch (err) {
		const error = new HttpError('You should be authenticated in order to update!');
		throw error;
	};

	let animal;
	try {
		animal = await Animal.findOne({ _id: animalId });
	} catch (err) {
		const error = new HttpError('Could not find animal for the provided id', 500);
		throw error;
	};

	if (animal.owner.toString() != authUser._id) {
		const error = new HttpError('You are not authorized to do that action!', 401);
		throw error;
	};

	// the owner is confirmed
	// I have a user and an animal confirmed aswell
	const { name, gender, age, image, neutered, description, additionalInfo, species } = params;

	animal.name = name || animal.name;
	animal.gender = gender || animal.gender;
	animal.neutered = neutered || animal.neutered;
	animal.species = species || animal.species;
	animal.age = age || animal.age;
	animal.description = description || animal.description;
	animal.additionalInfo = additionalInfo || animal.additionalInfo;

	try {
		await animal.save();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not update place.',
			500
		);
		return next(error);
	};

	return animal;
};


module.exports = {
	createAnimal,
	getAllAnimals,
	getAllDogs,
	getAllCats,
	getAnimalById,
	updateAnimal
};

