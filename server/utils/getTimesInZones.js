const getTimeInZones = (name, zones, data) => {
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

module.exports = getTimeInZones;
