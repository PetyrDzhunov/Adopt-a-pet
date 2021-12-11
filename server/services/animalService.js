const Animal = require('../models/Animal');

const createAnimal = async (req, res, next) => {
	const { name, gender, age, image, neutered, description, additionalInfo, owner, species } = req.body;
	console.log(name, gender, age, image, neutered, description, additionalInfo, owner, species);
};



module.exports = {
	createAnimal
};