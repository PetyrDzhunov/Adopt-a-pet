const router = require('express').Router();

router.post('/register', (req, res, next) => {
	// on this route users will register
	res.json({ ok: true });
});


router.post('/login', (req, res, next) => {
	// on this route users will login;
	res.json({ ok: true });

});

router.get('/:userId/animals', (req, res, next) => {
	// find all animals for a user and return them to the client
	res.json({ ok: true });

});

module.exports = router;