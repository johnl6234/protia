import { createStore } from 'vuex';
import chartsModule from './modules/charts/index';
import activitiesModule from './modules/activities/index';
// Create a new store instance.
const store = createStore({
	modules: {
		chartsModule,
		activitiesModule,
	},
	state() {
		return {
			loggedIn: false, // TODO set true for testing
			username: '',
			userData: {},
			userStats: {},
			userWorkouts: [],
			tempData: {},
			hasUnsavedChanges: false,
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
		clearTempData(state) {
			state.tempData = {};
		},

		setUserWorkouts(state, data) {
			state.userWorkouts = data;
		},

		setMapPoint(state, point) {
			state.mapPoint = point;
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

		getUserWorkouts(state) {
			return state.userWorkouts;
		},
		getUserWorkoutsLength(state) {
			return state.userWorkouts.length;
		},

		getMapPoint(state) {
			return state.mapPoint;
		},

		getHasUnsavedChanges(state) {
			return state.hasUnsavedChanges;
		},
	},
});

export default store;
