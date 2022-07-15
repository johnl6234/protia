var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

router.get('/:userId', (req, res, next) => {
	const { userId } = req.params;
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			const userWorkouts = await db
				.collection('workouts')
				.find({ owner: ObjectId(userId) })
				.toArray();
			client.close();
			if (userWorkouts) {
				res.send(userWorkouts);
			} else {
				res.send(null);
			}
		}
	);
});

router.post('/:userId', (req, res, next) => {
	const { userId } = req.params;
	const { workout } = req.body;

	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			db.collection('workouts')
				.insertOne({
					owner: ObjectId(userId),
					workout,
				})
				.then(response => {
					client.close();
					if (response) {
						res.send(response);
					} else res.send(null);
				});
		}
	);
});

module.exports = router;
