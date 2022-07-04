import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
	state() {
		return {
			loggedIn: false, // TODO set true for testing
			username: '',
			userData: {},
			userStats: {},
			userCharts: [],
			userWorkouts: [],
			userActivities: [],
			tempData: {},
			hasUnsavedChanges: false,
			mapPoint: 0,
			dateRange: {
				name: 'Last 7 days',
				range: {
					beforeToday: 7,
					afterToday: 0,
				},
			},
		};
	},
	mutations: {
		login(state) {
			state.loggedIn = true;
		},
		logout(state) {
			state.loggedIn = false;
		},
		setUsername(state, username) {
			state.username = username;
		},
		setUserData(state, userData) {
			state.userData = userData;
		},
		setUserStats(state, userStats) {
			state.userStats = userStats;
		},
		setTempData(state, data) {
			for (const [key, value] of Object.entries(data)) {
				state.tempData[key] = value;
			}
		},
		clearTempData(state) {
			state.tempData = {};
		},
		setUserCharts(state, data) {
			state.userCharts = data;
		},
		setUserWorkouts(state, data) {
			state.userWorkouts = data;
		},
		setUserActivities(state, activities) {
			state.userActivities = activities;
		},
		setMapPoint(state, point) {
			state.mapPoint = point;
		},
		setDateRange(state, range) {
			state.dateRange = range;
		},
		setHasUnsavedChanges(state, changed) {
			state.hasUnsavedChanges = changed;
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.loggedIn;
		},
		getUsername(state) {
			return state.username;
		},
		getUserData(state) {
			return state.userData;
		},
		getUserStats(state) {
			return state.userStats;
		},
		getTempData(state) {
			return state.tempData;
		},
		getUserCharts(state) {
			return state.userCharts;
		},
		getUserChartsLength(state) {
			return state.userCharts.length;
		},
		getUserWorkouts(state) {
			return state.userWorkouts;
		},
		getUserWorkoutsLength(state) {
			return state.userWorkouts.length;
		},
		getUserActivities(state) {
			return state.userActivities;
		},
		getUserActivitiesLength(state) {
			return state.userActivities.length;
		},
		getMapPoint(state) {
			return state.mapPoint;
		},
		setDateRange(state) {
			return state.dateRange;
		},
		getHasUnsavedChanges(state) {
			return state.hasUnsavedChanges;
		},
	},
});

export default store;
