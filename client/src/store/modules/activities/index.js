export default {
	state() {
		return {
			userActivities: [],
		};
	},
	mutations: {
		setUserActivities(state, activities) {
			state.userActivities = activities;
		},
	},
	getters: {
		getUserActivities(state) {
			return state.userActivities;
		},
		getUserActivitiesLength(state) {
			return state.userActivities.length;
		},
	},
	actions: {},
};
