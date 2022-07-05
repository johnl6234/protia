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
				res.json({
					success: 'Logged in successfully',
					//id: user._id,
					user: user,
				});
			}
		}
	);
});

module.exports = router;
