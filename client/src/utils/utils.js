export const getTimeInZones = (name, zones, data) => {
	let zonesArrays = {
		zone1: 0,
		zone2: 0,
		zone3: 0,
		zone4: 0,
		zone5: 0,
		zone6: 0,
		zone7: 0,
	};
	if (name === 'heart_rate') {
		data.forEach(dataPoint => {
			if (dataPoint < zones[0].bpm) zonesArrays.zone1++;
			if (dataPoint > zones[0].bpm && dataPoint < zones[1].bpm)
				zonesArrays.zone2++;
			if (dataPoint > zones[1].bpm && dataPoint < zones[2].bpm)
				zonesArrays.zone3++;
			if (dataPoint > zones[2].bpm && dataPoint < zones[3].bpm)
				zonesArrays.zone4++;
			if (dataPoint > zones[3].bpm) zonesArrays.zone5++;
		});
		delete zonesArrays.zone6;
		delete zonesArrays.zone7;
	} else if (name === 'power') {
		data.forEach(dataPoint => {
			if (dataPoint < zones[0].watts) zonesArrays.zone1++;
			if (dataPoint > zones[0].watts && dataPoint < zones[1].watts)
				zonesArrays.zone2++;
			if (dataPoint > zones[1].watts && dataPoint < zones[2].watts)
				zonesArrays.zone3++;
			if (dataPoint > zones[2].watts && dataPoint < zones[3].watts)
				zonesArrays.zone4++;
			if (dataPoint > zones[3].watts && dataPoint < zones[4].watts)
				zonesArrays.zone5++;
			if (dataPoint > zones[4].watts && dataPoint < zones[5].watts)
				zonesArrays.zone6++;
			if (dataPoint > zones[5].watts) zonesArrays.zone7++;
		});
	}

	return objectToColumns(zonesArrays);
};

const objectToColumns = object => {
	let columns = [];
	for (const [key, value] of Object.entries(object)) {
		columns.push([key, Math.round(value / 60)]);
	}
	return columns;
};

export function makeId(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}
// data = [3,34,32,2,34,5,4,7,6,47,5,8,5,4,4,3,5,,57,6,4,3,5,23,23,5,6,]
export function GetPeak(data, overTime) {
	// data to be an array of values
	// overTime to be number of seconds to average over
	let dataArray = data.filter(
		el => el !== 'undefined' && el != 0 && el != 65535
	);
	//iterate over data array
	let peaks = [];
	if (dataArray.length < overTime) {
		console.log('no data', dataArray);
		return;
	}
	for (let i = overTime; i < dataArray.length; i++) {
		let average = 0;
		for (let j = 0; j < overTime; j++) {
			let index = i - j;
			average += Number(dataArray[index]);
		}
		average /= Number(overTime);
		peaks.push(Math.round(average));
	}
	console.log('peak', Math.max(...peaks));
}
