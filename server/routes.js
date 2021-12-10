const router = require('express').Router();
const animalsController = require('./controllers/animalsController');

router.use('/animals', animalsController);



module.exports = router;