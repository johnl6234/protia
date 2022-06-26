const parseFit = require('./utils/parseFit')
const path = require('path');
const dayjs = require('dayjs')

parseFit(path.join(__dirname, './test_data/7452283876_ACTIVITY.fit'))

let stringArray = [
    'Wed Sep 08 2021 18:03:20 GMT+0100 (British Summer Time),undefined',
    'Wed Sep 08 2021 18:03:21 GMT+0100 (British Summer Time),undefined',
    'Wed Sep 08 2021 18:03:22 GMT+0100 (British Summer Time),undefined',

    'Wed Sep 08 2021 18:05:38 GMT+0100 (British Summer Time),60',
    'Wed Sep 08 2021 18:05:39 GMT+0100 (British Summer Time),58']

//let array = []


//for (string of stringArray) {
//    let stringParts = string.split(',')
//    let obj = {
//        time: dayjs(stringParts[0]).format("YYYY-MM-DD"),
//        value: stringParts[1]
//    }
//    array.push(obj)
//}

//console.log(array)