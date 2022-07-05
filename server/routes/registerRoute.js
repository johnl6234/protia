const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const hash = require('pbkdf2-password')();

// get all activities
router.post('/', async (req, res, next) => {
	console.log('REQ register', req.body);
	const { username, password, firstname, lastname, email } = req.body;
	let userData = {
		username: username,
		email: email,
		password: password,
		firstname: firstname,
		lastname: lastname,
	};
	await MongoClient.connect(process.env.MONGODB, {
		useUnifiedTopology: true,
	}).then(async client => {
		const db = client.db('training');
		let user = await db.collection('users').findOne({ username: username });
		if (user) {
			client.close();
			res.send({ error: 'username already exists' });
		} else {
			await hash(userData, function (err, pass, salt, hash) {
				if (err) res.send('error', err);

				MongoClient.connect(process.env.MONGODB, {
					useUnifiedTopology: true,
				}).then(async client => {
					const db = client.db('training');
					await db.collection('users').insertOne({
						username,
						salt,
						hash,
						email,
						firstname,
						lastname,
					});
					await db.collection('stats').insertOne({ username });
					client.close();
					res.send({ success: 'account created successfully' });
				});
			});
		}
	});
});

module.exports = router;
