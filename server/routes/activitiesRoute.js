const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId, ISODate } = require('mongodb');

const getStats = require('../utils/getStats');

// get activities in dateRange
router.get('/dateRange', async (req, res, next) => {
	const { beforeToday, afterToday } = req.query;
	let MsInDay = 1000 * 3600 * 24;
	// afterToday date to search
	let toDate = new Date(new Date().valueOf() + MsInDay * afterToday);
	// beforeToday date to search
	let fromDate = new Date(new Date().valueOf() - MsInDay * beforeToday);
	let activities = null;
	await MongoClient.connect(process.env.MONGODB, {
		useUnifiedTopology: true,
	}).then(async client => {
		const db = client.db('training');
		activities = await db
			.collection('activities')
			.find({ dateStamp: { $gte: fromDate, $lt: toDate } })
			.toArray();
		client.close();
	});
	let stats = await getStats(activities);
	let data = {
		activities: activities,
		stats: stats,
	};
	res.send(data);
});

// Delete Activity
router.post('/delete', async (req, res, next) => {
	const { id, filePath } = req.body;
	let activities = null;
	await MongoClient.connect(process.env.MONGODB, {
		useUnifiedTopology: true,
	}).then(async client => {
		const db = client.db('training');
		await db.collection('activities').deleteOne({ _id: ObjectId(id) });
		activities = await db.collection('activities').find().toArray();
	});
	fs.unlink(filePath, err => {
		if (err) throw err;
	});
	let data = {
		activities: activities,
	};
	res.send(data);
});

// get activity by Id
router.get('/activity/:id', async (req, res, next) => {
	const { id } = req.params;
	console.log('id', id);
	let activity = null;
	await MongoClient.connect(process.env.MONGODB, {
		useUnifiedTopology: true,
	}).then(async client => {
		const db = client.db('training');
		activity = await db
			.collection('activities')
			.findOne({ _id: ObjectId(id) });
	});
	activity.route = activity.route.filter(function (item) {
		return item[0] < 179 && item[1] < 179;
	});
	res.send(activity);
});

// get all activities
router.get('/:userId', async (req, res, next) => {
	const { userId } = req.params;
	console.log('user', userId);
	let activities = null;
	await MongoClient.connect(process.env.MONGODB, {
		useUnifiedTopology: true,
	}).then(async client => {
		const db = client.db('training');
		activities = await db
			.collection('activities')
			.find({ owner: ObjectId(userId) })
			.toArray();
	});
	let stats = await getStats(activities);
	let data = {
		activities: activities,
		stats: stats,
	};
	res.send(data);
});

module.exports = router;
