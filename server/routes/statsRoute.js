var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb')

router.get('/', (req, res, next) => {
    const { username } = req.body;
    MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            let stats = await db.collection('stats').findOne({ username: username })
        })
});

router.post('/', (req, res, next) => {
});

module.exports = router;
