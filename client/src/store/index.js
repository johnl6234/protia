import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
	state() {
		return {
			loggedIn: true, // TODO set true for testing
			username: 'johnl6234',
			userData: {},
			userStats: {},
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
	},
});

export default store;
