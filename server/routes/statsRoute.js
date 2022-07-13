var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

router.get('/:userId', (req, res, next) => {
	const { userId } = req.params;
	console.log('req', req.params);
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			let stats = await db
				.collection('stats')
				.findOne({ owner: ObjectId(userId) });
			if (stats) res.send(stats);
		}
	);
});

router.post('/', (req, res, next) => {});

module.exports = router;
