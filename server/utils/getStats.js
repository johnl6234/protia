const GetStats = activities => {
	let CTL = 0;
	let ATL = 0;
	let TSB = 0;

	let today = new Date();
	let averageDate = new Date();
	averageDate.setDate(averageDate.getDate() - 42);

	const todayString = today.toISOString();
	const dateString = averageDate.toISOString();

	for (let activity of activities) {
		if (
			activity.session.timestamp <= today ||
			activity.session.timestamp >= averageDate
		) {
			if (activity.session.training_stress_score !== 65535)
				CTL += activity.session.training_stress_score;
		}
	}
	let data = { ATL: ATL, CTL: CTL, TSB: TSB };
	return data;
};

module.exports = GetStats;
