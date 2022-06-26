const fs = require('fs').promises;
const dayjs = require('dayjs');
const fitDecoder = require('fit-decoder');


const parseFit = async (filePath) => {
    const file = await fs.readFile(filePath);
    const buffer = file.buffer;

    const jsonRaw = fitDecoder.fit2json(buffer);
    json = fitDecoder.parseRecords(jsonRaw);
    let longLat = []
    for (let record of json.records) {
        if (record.type === 'record') {
            if (record.data.position_long < 179) {
                longLat.push([
                    record.data.position_long,
                    record.data.position_lat,
                ])
            }
        }
    }

    let heart_rate = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'heart_rate'))
    let power = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'power'))
    let cadence = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'cadence'))
    let altitude = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'altitude'))
    let speed = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'speed'))
    let distance = convertToArray(fitDecoder.getValueOverTime(json, 'record', 'distance'))

    let data = {
        date: null,
        dateStamp: null,
        filePath: filePath,
        session: null,
        route: longLat,
        heart_rate: heart_rate,
        power: power,
        cadence: cadence,
        elevation: altitude,
        speed: speed,
        distance: distance,
    }

    for (let record of json.records) {
        if (record.type === 'session') {
            data.session = record.data
            data.dateStamp = record.data.start_time
            data.date = dayjs(record.data.start_time).format("YYYY-MM-DD")
        }
        if (record.type === 'sport') data.sport = record.data

    }
    let FTPace = 5.5
    if (!data.session.training_stress_score) {
        let s = data.session.total_elapsed_time / 1000;
        let NGP = data.session.avg_speed * 3.6;
        let IF = (FTPace / NGP).toFixed(2);

        data.session.training_stress_score = calculateRTSS(s, NGP, IF, FTPace);
        data.session.intensity_factor = IF;
    }
    return data
}

const convertToArray = (stringArray) => {
    let array = []
    for (string of stringArray) {
        let stringParts = string.split(',')
        let value = stringParts[1]
        array.push(value)
    }
    return array
}

// s = duration in seconds
// W = Normilized power in Watts
// IF = Intensity Factor
// FTP = Functional Threshold Power
const CalculateTSS = (s, W, IF, FTP) => {
    let TSS = ((s * W * IF / (FTP * 3600)) * 100);
    return TSS
}
// s = duration in seconds
// NGP = Normilized Graded Pace
// IF = intensity factor
// FTP = Functional Threshold Pace
const calculateRTSS = (s, NGP, IF, FTP) => {
    let rTSS = ((s * NGP * IF) / (FTP * 3600)) * 100
    return rTSS
}

module.exports = parseFit