import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
	state() {
		return {
			loggedIn: true, // TODO set true for texting
			username: 'johnl6234',
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
	},
	getters: {
		isLoggedIn(state) {
			return state.loggedIn;
		},
		getUsername(state) {
			return state.username;
		},
	},
});

export default store;
