const router = require('express').Router();
const animalsController = require('./controllers/animalsController');
const usersController = require('./controllers/usersController');

router.use('/animals', animalsController);
router.use('/users', usersController);

module.exports = router;