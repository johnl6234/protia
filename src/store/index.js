import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router/index.js';
import chartsModule from './modules/charts/index.js';
import activitiesModule from './modules/activities/index.js';
import workoutModule from './modules/workouts/index.js';
import userSettingsModule from './modules/settings/index.js';
import dataModule from './modules/data/index.js';
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
			loading: false,
			loggedIn: false, // set true for testing
			mapPoint: 0,
		};
	},
	mutations: {
		setIsLoading(state, payload) {
			state.loading = payload;
		},
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
		isLoading(state) {
			return state.loading;
		},
		isLoggedIn(state) {
			return state.loggedIn;
		},

		getMapPoint(state) {
			return state.mapPoint;
		},
	},
	actions: {
		login(context, payload) {
			const config = {
				'Access-Control-Allow-Origin': '*',
			};
			axios
				.post(
					import.meta.env.VITE_SERVER_URI + 'login',
					payload,
					config
				)
				.then(res => {
					if (res.data.success) {
						//remove unused data
						delete res.data.hash;
						delete res.data.salt;
						delete res.data.success;
						// set localStorage token
						localStorage.setItem(
							'accessToken',
							res.data.accessToken
						);
						console.log('returned', res.data);
						context.commit('login');
						context.dispatch('setUserData', res.data.user);
						router.push({ path: '/' });
					} else {
						this.message = res.data.error;
					}
				});
		},
		autoLogin(context, token) {
			axios
				.post(
					import.meta.env.VITE_SERVER_URI + 'auth',
					{},
					{
						headers: {
							'x-access-token': token,
						},
					}
				)
				.then(res => {
					if (res.data.success) {
						context.commit('login');
						context.dispatch('setUserData', res.data.user);
						router.push({ path: '/' });
					}
				});
		},
	},
});

export default store;
