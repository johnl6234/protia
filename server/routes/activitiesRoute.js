const fs = require('fs').promises;
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const getStats = require('../utils/getStats');
const GetPeakStats = require('../utils/getPeaks');

// get activities in dateRange
router.get('/dateRange', async (req, res, next) => {
	const { beforeToday, afterToday, userId } = req.query;
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
			.find({
				owner: ObjectId(userId),
				dateStamp: { $gte: fromDate, $lt: toDate },
			})
			.toArray();
		client.close();
	});
	let stats = getStats(activities);
	let peaks = GetPeakStats(activities);
	let timeInZones = collateTimeInZones(activities);
	let data = {
		activities: activities,
		stats: stats,
		peaks: peaks,
		timeInZones: timeInZones,
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
	let stats = getStats(activities);
	let data = {
		activities: activities,
		stats: stats,
	};
	res.send(data);
});

module.exports = router;

const collateTimeInZones = activities => {
	let heartZonesArrays = {
		zone1: 0,
		zone2: 0,
		zone3: 0,
		zone4: 0,
		zone5: 0,
	};
	let powerZonesArrays = {
		zone1: 0,
		zone2: 0,
		zone3: 0,
		zone4: 0,
		zone5: 0,
		zone6: 0,
		zone7: 0,
	};
	activities.forEach(activity => {
		for (let i = 0; i < activity.timeInZones.heart_rate.length; i++) {
			heartZonesArrays[`zone${i + 1}`] +=
				activity.timeInZones.heart_rate[i][1];
		}
		for (let i = 0; i < activity.timeInZones.power.length; i++) {
			powerZonesArrays[`zone${i + 1}`] +=
				activity.timeInZones.power[i][1];
		}
	});

	return {
		timeInPowerZones: objectToColumns(powerZonesArrays),
		timeInHeartZones: objectToColumns(heartZonesArrays),
	};
};

const objectToColumns = object => {
	let columns = [];
	for (const [key, value] of Object.entries(object)) {
		columns.push([key, value]);
	}
	return columns;
};
