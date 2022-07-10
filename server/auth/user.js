var express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
		async client => {
			const db = client.db('training');
			let user = await db
				.collection('users')
				.findOne({ _id: ObjectId(req.userId) });
			client.close();
			if (user) {
				delete user.hash;
				delete user.salt;
				const data = {
					success: 'Logged in successfully',
					user: user,
				};
				console.log('auto data', data);
				res.send(data);
			}
		}
	);
});

module.exports = router;
