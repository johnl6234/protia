var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

router.get('/:userId', (req, res, next) => {
	const { userId } = req.params;
	console.log('userId', userId);
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			const userCharts = await db
				.collection('charts')
				.findOne({ owner: ObjectId(userId) });
			client.close();
			if (userCharts) {
				console.log('charts res', userCharts);
				res.send(userCharts);
			} else {
				console.log('non found');
				res.send(null);
			}
		}
	);
});

router.post('/:userId', (req, res, next) => {
	const { userId } = req.params;
	const { charts } = req.body;

	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			db.collection('charts')
				.updateOne(
					{ owner: ObjectId(userId) },
					{
						$set: {
							charts: charts,
						},
					},
					{ upsert: true }
				)
				.then(response => {
					client.close();
					if (response) {
						console.log('charts', response);
						res.send(response);
					} else res.send(null);
				});
		}
	);
});

module.exports = router;
