const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb')
const hash = require('pbkdf2-password')()


router.post('/', async (req, res, next) => {
    console.log('body', req.body)
    const { username, password } = req.body;

    MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('training')
            let user = await db.collection('users').findOne({ username: username })
            console.log('USER', user)
            if (user) {
                hash({ password: password, salt: user.salt }, function (err, pass, salt, hash) {
                    if (err) return fn(err);
                    if (hash === user.hash) {
                        console.log('SUCCESS')
                        res.send({ 'success': 'Logged in successfully' })
                    }
                    else {
                        console.log('FAILED')
                        res.send({ 'error': 'Invalid Username or Password' })
                    }
                });

            } else {
                console.log('NO USER')
                res.send({ 'error': 'User not found' })
            }
        })
});

module.exports = router;