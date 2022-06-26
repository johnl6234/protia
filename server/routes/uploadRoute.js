const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb')

const parseFit = require('../utils/parseFit')

router.post('/', async (req, res, next) => {
    console.log('REQ files', req.files);
    const { username } = req.body
    console.log('upload', username)
    MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            let parsedFiles = [];
            for (let file of req.files) {
                let filePath = './uploads/' + file.originalname
                let data = await parseFit(filePath)
                parsedFiles.push(data)
            }
            for (file of parsedFiles) {
                file.owner = username
                // for test use with old files
                //file.date = file.date.replace('2019', '2022')
                //file.dateStamp = new Date(file.date)
            }
            db.collection('activities').insertMany(parsedFiles)
        })
        .then(result => res.send(result))
    res.end()
});

module.exports = router;
