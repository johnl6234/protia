import { makeId } from '../../../utils/utils';

export default {
	state() {
		return {
			chartList: [
				{
					title: 'Time in Hr/Zones',
					order: 0,
					component: 'BarChart',
					dataName: 'heart_rate',
					data: {
						columns: [['heart_rate', 30, 200, 100, 400, 150, 250]],
					},
				},
				{
					title: 'Time in Pw/Zones',
					order: 0,
					component: 'BarChart',
					dataName: 'power',
					data: {
						columns: [['power', 120, 320, 230, 120, 160, 430]],
					},
				},
				{
					title: 'Peak Power',
					order: 0,
					component: 'LineChart',
					dataName: 'peakPower',
					data: {
						columns: [
							[
								'x',
								'3-sec',
								'10-sec',
								'30-sec',
								'1-min',
								'20-min',
							],
							['data', 400, 350, 320, 280, 220],
						],
					},
				},
			],
			userCharts: [],
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
		setUserCharts(state, data) {
			state.userCharts = data;
		},
		setDateRange(state, range) {
			state.dateRange = range;
		},
		addChartToUserList(state, chart) {
			chart.id = makeId(7);
			chart.order = state.userCharts.length;
			state.userCharts.push(chart);
		},
		// change data for all displayed charts with dataName
		changeUserChartData(state, payload) {
			state.userCharts.forEach(chart => {
				if (chart.dataName == payload.name)
					chart.data.columns = payload.data;
			});
		},
		// change data for new charts
		changeChartData(state, payload) {
			state.chartList.forEach(chart => {
				if (chart.dataName == payload.name)
					chart.data.columns = payload.data;
			});
		},
		removeChart(state, index) {
			state.userCharts.splice(index, 1);
		},
	},
	getters: {
		getChartList(state) {
			return state.chartList;
		},
		getUserCharts(state) {
			return state.userCharts;
		},
		getUserChartsLength(state) {
			return state.userCharts.length;
		},
		getDateRange(state) {
			return state.dateRange;
		},
	},
	actions: {
		setUserCharts(context, payload) {
			context.commit('setUserCharts', payload);
		},
		setDateRange(context, payload) {
			context.commit('setDateRange', payload);
		},
		addChartToUserList(context, payload) {
			context.commit('addChartToUserList', payload);
		},
		setUserChartData(context, payload) {
			context.commit('changeChartData', payload);
			context.commit('changeUserChartData', payload);
		},
		removeChart(context, payload) {
			context.commit('removeChart', payload);
		},
	},
};
