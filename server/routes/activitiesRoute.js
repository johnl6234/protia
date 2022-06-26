const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId, ISODate } = require('mongodb')

const getStats = require('../utils/getStats')




// get activities in dateRange
router.get('/dateRange', async (req, res, next) => {
    const { from, to } = req.query;
    let fromDate = new Date(from)
    let toDate = new Date(to)
    let activities = null;
    await MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            activities = await db.collection('activities')
                .find({ dateStamp: { $gte: fromDate, $lt: toDate } }).toArray()
        })
    let stats = await getStats(activities)
    let data = {
        activities: activities,
        stats: stats
    }
    res.send(data);
});

// Delete Activity
router.post('/delete', async (req, res, next) => {
    const { id, filePath } = req.body;
    let activities = null;
    await MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            await db.collection('activities')
                .deleteOne({ _id: ObjectId(id) })
            activities = await db.collection('activities')
                .find().toArray()
        })
    fs.unlink(filePath, err => {
        if (err) throw err;
    });
    let data = {
        activities: activities,
    }
    res.send(data);
})

// get activity by Id
router.get('/activity/:id', async (req, res, next) => {
    const { id } = req.params
    let activity = null;
    await MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            activity = await db.collection('activities')
                .findOne({ _id: ObjectId(id) })
        })
    activity.route = activity.route.filter(function (item) {
        return item[0] < 179 && item[1] < 179
    })
    res.send(activity)
})

// get all activities
router.get('/:username', async (req, res, next) => {
    const { username } = req.params
    console.log('user', username)
    let activities = null;
    await MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            activities = await db.collection('activities').find({ "owner": username }).toArray()
        })
    let stats = await getStats(activities)
    let data = {
        activities: activities,
        stats: stats
    }
    res.send(data);
});



module.exports = router;