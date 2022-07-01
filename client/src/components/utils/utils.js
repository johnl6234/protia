export const getTimeInZones = (zones, data) => {
	let zonesArrays = {
		zone1: 0,
		zone2: 0,
		zone3: 0,
		zone4: 0,
		zone5: 0,
		zone6: 0,
		zone7: 0,
	};
	if (zones.name === 'heart_rate') {
		data.forEach(dataPoint => {
			if (dataPoint < zones.z1) zonesArrays.zone1++;
			if (dataPoint > zones.z1 && dataPoint < zones.z2)
				zonesArrays.zone2++;
			if (dataPoint > zones.z2 && dataPoint < zones.z3)
				zonesArrays.zone3++;
			if (dataPoint > zones.z3 && dataPoint < zones.z4)
				zonesArrays.zone4++;
			if (dataPoint > zones.z4) zonesArrays.zone5++;
		});
	} else if (zones.name === 'power') {
		data.forEach(dataPoint => {
			if (dataPoint < zones.z1) zonesArrays.zone1++;
			if (dataPoint > zones.z1 && dataPoint < zones.z2)
				zonesArrays.zone2++;
			if (dataPoint > zones.z2 && dataPoint < zones.z3)
				zonesArrays.zone3++;
			if (dataPoint > zones.z3 && dataPoint < zones.z4)
				zonesArrays.zone4++;
			if (dataPoint > zones.z4 && dataPoint < zones.z5)
				zonesArrays.zone4++;
			if (dataPoint > zones.z5 && dataPoint < zones.z6)
				zonesArrays.zone4++;
			if (dataPoint > zones.z6) zonesArrays.zone4++;
		});
	}
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
