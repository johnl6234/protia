const GetPeakStats = activities => {
	let data = [];
	activities.forEach(activity => {
		data.push(...activity.power);
	});
	// data to be an array of values
	// overTime to be number of seconds to average over
	let peaks = {
		second3Peaks: GetPeak(data, 3),
		second10Peaks: GetPeak(data, 10),
		second30Peaks: GetPeak(data, 30),
		minutePeaks: GetPeak(data, 60),
		minute20Peak: GetPeak(data, 60 * 60),
	};
	return peaks;
};

module.exports = GetPeakStats;

const GetPeak = (data, overTime) => {
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
	return Math.max(...peaks);
};
