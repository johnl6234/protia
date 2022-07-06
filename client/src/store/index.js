import { createStore } from 'vuex';
import chartsModule from './modules/charts/index';
import activitiesModule from './modules/activities/index';
import workoutModule from './modules/workouts/index';
import userSettingsModule from './modules/settings/index';
import dataModule from './modules/data/index';
// Create a new store instance.
const store = createStore({
	modules: {
		chartsModule,
		activitiesModule,
		workoutModule,
		userSettingsModule,
		dataModule,
	},
	state() {
		return {
			loggedIn: false, // TODO set true for testing

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

		setMapPoint(state, point) {
			state.mapPoint = point;
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.loggedIn;
		},

		getMapPoint(state) {
			return state.mapPoint;
		},
	},
});

export default store;
