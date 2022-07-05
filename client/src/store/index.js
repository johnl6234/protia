import { createStore } from 'vuex';
import chartsModule from './modules/charts/index';
import activitiesModule from './modules/activities/index';
import workoutModule from './modules/workouts/index';
// Create a new store instance.
const store = createStore({
	modules: {
		chartsModule,
		activitiesModule,
		workoutModule,
	},
	state() {
		return {
			loggedIn: false, // TODO set true for testing
			username: '',
			userData: {},
			userStats: {},
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

		getMapPoint(state) {
			return state.mapPoint;
		},

		getHasUnsavedChanges(state) {
			return state.hasUnsavedChanges;
		},
	},
});

export default store;
