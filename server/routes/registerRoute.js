const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const hash = require('pbkdf2-password')();

// get all activities
router.post('/', async (req, res, next) => {
	console.log('REQ register', req.body);
	const { username, password, email } = req.body;
	let userData = {
		username: username,
		email: email,
		password: password,
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
					const results = await db.collection('users').insertOne({
						username,
						salt,
						hash,
						email,
						zones: defaultZones,
						ltThreshold: 168,
						maxHr: 185,
					});
					await db
						.collection('stats')
						.insertOne({ owner: results.insertedId });
					client.close();
					res.send({ success: 'account created successfully' });
				});
			});
		}
	});
});

module.exports = router;

const defaultZones = {
	heart_rate: [
		{
			number: 1,
			bpm: 143,
			percent: 85,
		},
		{
			number: 2,
			bpm: 150,
			percent: 89,
		},
		{
			number: 3,
			bpm: 158,
			percent: 94,
		},
		{
			number: 4,
			bpm: 166,
			percent: 99,
		},
		{
			number: 5,
			bpm: 178,
			percent: 106,
		},
	],
	power: [
		{
			number: 1,
			watts: 110,
			percent: 55,
		},
		{
			number: 2,
			watts: 150,
			percent: 75,
		},

		{
			number: 3,
			watts: 180,
			percent: 90,
		},
		{
			number: 4,
			watts: 210,
			percent: 105,
		},
		{
			number: 5,
			watts: 240,
			percent: 120,
		},
		{
			number: 6,
			watts: 400,
			percent: 200,
		},

		{
			number: 7,
			watts: 800,
			percent: 400,
		},
	],
};
