const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

router.post('/:userId', async (req, res, next) => {
	const { userId } = req.params;
	delete req.body._id;
	if (req.body.password) delete req.body.password;
	if (req.body.reTypePassword) delete req.body.reTypePassword;
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			let user = await db
				.collection('users')
				.updateOne({ _id: ObjectId(userId) }, { $set: req.body });
			if (user) {
				client.close();
				res.send(user);
			}
		}
	);
});

module.exports = router;
