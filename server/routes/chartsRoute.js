var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

router.get('/:userId', (req, res, next) => {
	const { userId } = req.params;
	console.log('charts', userId);
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			db.collection('charts')
				.findOne({ owner: ObjectId(userId) })
				.then(response => {
					if (response) {
						console.log('charts', response);
						res.send(response);
					} else res.send(null);
				});
		}
	);
});

router.post('/', (req, res, next) => {});

module.exports = router;
