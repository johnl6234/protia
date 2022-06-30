require('dotenv').config({ path: './config.env' });
const { MongoClient, ObjectId } = require('mongodb');
const parseFit = require('./utils/parseFit');
const path = require('path');
const dayjs = require('dayjs');

MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true }).then(
	async client => {
		console.log('Connected to Database');
		const db = client.db('training');
		const activities = db.collection('activities');

		activities.updateMany(
			{},
			{ $set: { owner: ObjectId('61def3217515d569b40377c5') } },
			{ upsert: false }
		);
		//const data = await parseFit(path.join(__dirname, './test_data/500602897_ACTIVITY.fit'))
		//activities.insertOne(data)
		//    .then(result => {
		//        console.log(result)
		//    })
		//    .catch(error => console.error(error))
	}
);

//MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
//    .then(async client => {
//        console.log('Connected to Database');
//        const db = client.db('training');

//        let dates = []
//        let prevDate = 90
//        let to = new Date()
//        from = new Date();
//        from.setDate(to.getDate() - prevDate)
//        for (var i = 0; i < prevDate; i++) {
//            console.log('I', i)
//            let date = new Date(from.setDate(from.getDate() + 1)).setHours(0, 0, 0)
//            dates.push({
//                date: new Date(date),
//                stats: {
//                    TSS: 0,
//                    ATL: 0,
//                    CTL: 0,
//                    TS8: 0,
//                }
//            })
//        }
//        console.log('Done')
//        const data = {
//            username: 'john lockham',
//            dates: dates
//        }

//        console.log('DATA', data);
//        await db.collection('calendar').insertOne(data)
//            .then(result => {
//                console.log('Results', result)
//            })
//            .catch(error => console.error('Error', error))
//    })
