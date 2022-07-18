var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	// TODO
	console.log('index');
	res.send({ message: 'made it in' });
});

module.exports = router;
