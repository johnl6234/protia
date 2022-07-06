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
			if (dataPoint < zones[0].bpm) zonesArrays.zone1++;
			if (dataPoint > zones[0].bpm && dataPoint < zones[1].bpm)
				zonesArrays.zone2++;
			if (dataPoint > zones[1].bpm && dataPoint < zones[2].bpm)
				zonesArrays.zone3++;
			if (dataPoint > zones[2].bpm && dataPoint < zones[3].bpm)
				zonesArrays.zone4++;
			if (dataPoint > zones[3].bpm && dataPoint < zones[4].bpm)
				zonesArrays.zone5++;
			if (dataPoint > zones[4].bpm && dataPoint < zones[5].bpm)
				zonesArrays.zone6++;
			if (dataPoint > zones[5].bpm) zonesArrays.zone7++;
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
const zones = {
	name: 'heart_rate',
	// maximum value
	z1: 135,
	z2: 150,
	z3: 156,
	z4: 167,
	z5: 255,
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
