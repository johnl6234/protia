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
			zones: {
				heart_rate: [],
				power: [],
			},
		};
	},
	mutations: {
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
		setHasUnsavedChanges(state, changed) {
			state.hasUnsavedChanges = changed;
		},
		changeZone(state, payload) {
			state.zones[payload.name][payload.zone.number - 1].bpm =
				payload.zone.bpm;
			state.zones[payload.name][payload.zone.number - 1].percent =
				payload.zone.percent;
		},
		changeAllZones(state, payload) {
			state.zones[payload.name] = payload.zones;
		},
		setInitialZones(state, payload) {
			state.zones = payload;
		},
		setMaxHr(state, payload) {
			state.maxHr = payload;
		},
		setLtThreshold(state, payload) {
			state.ltThreshold = payload;
		},
	},
	getters: {
		getUserId(state) {
			return state.userData._id;
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
			context.commit('setInitialZones', payload.zones);
			context.commit('setMaxHr', payload.maxHr);
			context.commit('setLtThreshold', payload.ltThreshold);
			delete payload.zones;
			delete payload.maxHr;
			delete payload.ltThreshold;

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
		changeZone(context, payload) {
			context.commit('setHasUnsavedChanges', true);
			context.commit('changeZone', payload);
		},
		changeAllZones(context, payload) {
			context.commit('setHasUnsavedChanges', true);
			context.commit('changeAllZones', payload);
		},
		setLtThreshold(context, payload) {
			context.commit('setHasUnsavedChanges', true);
			context.commit('setLtThreshold', payload);
		},
	},
};
