import { v4 as uuidv4 } from 'uuid';
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
			chart.id = makeId(7); //uuidv4().replaceAll('-', '');
			chart.order = state.userCharts.length;
			state.userCharts.push(chart);
		},
		setChartData(state, payload) {
			state.chartList.find(
				chart => chart.dataName == payload.name
			).data.columns = payload.data;
		},
		setUserChartData(state, payload) {
			state.chartList.find(
				chart => chart.dataName == payload.name
			).data.columns = payload.data;
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
		setChartData(context, payload) {
			context.commit('setChartData', payload);
		},
		setUserChartData(context, payload) {
			context.commit('setUserChartData', payload);
		},
		removeChart(context, payload) {
			context.commit('removeChart', payload);
		},
	},
};
