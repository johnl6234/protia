import axios from 'axios';
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
	actions: {
		async getActivities(context) {
			const res = await axios.get(
				import.meta.env.VITE_SERVER_URI +
					'activities/' +
					context.getters.getUserData._id
			);
			res.data.activities.forEach(activity => {
				activity.title = activity.session.sport;
				activity.startDate = activity.date;
				activity.id = activity._id;
				activity.classes = [activity.session.sport];
			});
			context.commit('setUserActivities', [...res.data.activities]);
		},
	},
};
