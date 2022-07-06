export default {
	state() {
		return {
			username: '',
			userData: {},
			userStats: {},
			tempData: {},
			hasUnsavedChanges: false,
			maxHr: 185,
			ltThreshold: 168,
			zones: {},
		};
	},
	mutations: {
		setUsername(state, username) {
			state.username = username;
		},
		setUserData(state, userData) {
			state.zones = userData.zones;
			state.maxHr = userData.maxHr;
			state.ltThreshold = userData.ltThreshold;
			delete userData.zones;
			delete userData.maxHr;
			delete userData.ltThreshold;
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
		setHasUnsavedChanges(state, changed) {
			state.hasUnsavedChanges = changed;
		},
		setZones(state, payload) {
			state.zones[payload.name][payload.zone.number - 1].bpm =
				payload.zone.bpm;
			state.zones[payload.name][payload.zone.number - 1].percent =
				payload.zone.percent;
		},
	},
	getters: {
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
		getHasUnsavedChanges(state) {
			return state.hasUnsavedChanges;
		},
		getMaxHr(state) {
			return state.maxHr;
		},
		getLtThreshold(state) {
			return state.ltThreshold;
		},
		getZones(state) {
			return state.zones;
		},
	},
	actions: {
		setUserData(context, payload) {
			context.commit('setUserData', payload);
		},
		setUserStats(context, payload) {
			context.commit('setUserStats', payload);
		},
		setTempData(context, payload) {
			context.commit('setTempData', payload);
		},
		clearTempData(context) {
			context.commit('clearTempData');
		},
		setHasUnsavedChanges(context, payload) {
			context.commit('setHasUnsavedChanges', payload);
		},
		setZones(context, payload) {
			context.commit('setHasUnsavedChanges', true);
			context.commit('setZones', payload);
		},
	},
};
