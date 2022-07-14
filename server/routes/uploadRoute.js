const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const parseFit = require('../utils/parseFit');

router.post('/:userId', async (req, res, next) => {
	console.log('REQ files', req.files);
	const { userId } = req.params;
	console.log('upload', userId);
	MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
		.then(async client => {
			const db = client.db('training');
			let user = await db
				.collection('users')
				.findOne({ _id: ObjectId(userId) });
			if (!user) res.json({ error: 'no user found' });
			let parsedFiles = [];
			for (let file of req.files) {
				let filePath = './uploads/' + file.originalname;
				let data = await parseFit(filePath, user.zones);
				parsedFiles.push(data);
			}
			for (file of parsedFiles) {
				file.owner = ObjectId(userId);
			}
			await db.collection('activities').insertMany(parsedFiles);
			client.close();
		})
		.then(result => {
			res.send(result);
		});

	res.end();
});

module.exports = router;
