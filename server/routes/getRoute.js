const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

const fitDecoder = require('fit-decoder');
let elevation = ["elevation"];
let time = ["x"];
let dist = ["x"];
let coords = [];
let startPos = {};
let endPos = {};
let kms = 0;
let name = '';
let json = null;

const parseGPX = async () => {


    const file = await fs.readFile(path.join(__dirname, '../test_data/7452283876_ACTIVITY.fit'));
    const buffer = file.buffer;

    const jsonRaw = fitDecoder.fit2json(buffer);
    json = fitDecoder.parseRecords(jsonRaw);
    let longLat = []
    for (let record of json.records) {
        if (record.type === 'record') {
            longLat.push({
                long: record.data.position_long,
                lat: record.data.position_lat,
            })
        }
    }

    let data = {
        data: null,
        session: null,
        sport: null,
    }
    for (let record of json.records) {
        if (record.type === 'session') {
            data.session = record.data
            data.date = dayjs(record.data.start_time).format("YYYY-MM-DD")
        }
        if (record.type === 'sport') data.sport = record.data

    }
    console.log(data)
}


router.get('/', async (req, res, next) => {
    await parseGPX();
    console.log('after')
    let data = {
        startPos,
        endPos,
        elevation,
        time,
        dist,
        kms,
        coords,
        name,
    }
    images = [];
    coords = [];
    elevation = ["elevation"];
    time = ["x"];
    dist = ["x"];
    //res.send(data);
    res.send(json);
});

module.exports = router;