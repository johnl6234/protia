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
			tempData: {},
			mapPoint: 0,
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
		setUserCharts(state, data) {
			state.userCharts = data;
		},
		setUserWorkouts(state, data) {
			state.userWorkouts = data;
		},
		setMapPoint(state, point) {
			state.mapPoint = point;
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
		getUserWorkouts(state) {
			return state.userWorkouts;
		},
		getMapPoint(state) {
			return state.mapPoint;
		},
	},
});

export default store;
