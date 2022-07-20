<template>
	<div class="flex flex-row mb-10 dashboard w-full">
		<!-- Loading overlay -->
		<BaseOverlay :loading="loading" />

		<div class="flex flex-col w-40 bg-slate-50">
			<ChartListDrop
				:chartList="chartList"
				@addChartToList="addChartToList"
			/>
		</div>
		<div class="flex flex-col w-full bg-gray-300">
			<!-- Date range dropdown -->
			<div class="w-full p-2 bg-slate-50 border-l border-b-8 shadow-lg">
				<DateRange @getData="fetchDataInDateRange" />
			</div>
			<!-- Display charts -->
			<div
				class="flex flex-row flex-wrap overflow-auto overflow-x-hidden mb-3 min-h-full"
				@drop="onDrop($event, 1)"
				@dragover.prevent
				@dragenter.prevent
			>
				<div
					v-for="(chart, index) in userCharts"
					:key="chart.id"
					:title="chart.id"
					class="top-level"
					@dragover.prevent
					@dragenter.prevent="showDropZone"
				>
					<div
						draggable="true"
						@dragstart="startDrag($event, chart)"
						:title="chart.id"
						class="w-64 bg-white m-2 p-2 rounded-md"
					>
						<p :title="chart.id">
							{{ chart.title
							}}<span
								class="absolute right-3 hover:cursor-pointer"
								@click="removeChart(index)"
								>X</span
							>
						</p>
						<BarChart
							v-if="chart.component == 'BarChart'"
							:title="chart.id"
							:chartId="chart.id"
							:chartData="chart.data"
						/>
						<LineChart
							v-if="chart.component == 'LineChart'"
							:title="chart.id"
							:chartId="chart.id"
							:chartData="chart.data"
						/>
						<PieChart
							v-if="chart.component == 'PieChart'"
							:title="chart.id"
							:chartId="chart.id"
							:chartData="chart.data"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import ChartBar from 'vue-material-design-icons/ChartBar.vue';
	import LineChart from '../components/charts/LineChart.vue';
	import BarChart from '../components/charts/BarChart.vue';
	import PieChart from '../components/charts/PieChart.vue';
	import DateRange from '../components/dashboard/DateRange.vue';
	import BaseOverlay from '../components/base/BaseOverlay.vue';
	import ChartListDrop from '../components/dashboard/ChartListDrop.vue';
	import { moveInArray } from '../utils/utils';
	import store from '../store';
	export default {
		name: 'dashboard-page',
		components: {
			LineChart,
			BarChart,
			PieChart,
			ChartBar,
			DateRange,
			BaseOverlay,
			ChartListDrop,
		},
		data() {
			return {
				loading: false,
				chartListIsShown: false,
				rangedChartData: {},
			};
		},
		methods: {
			startDrag(evt, item) {
				evt.dataTransfer.dropEffect = 'move';
				evt.dataTransfer.effectAllowed = 'move';
				evt.dataTransfer.setData('itemID', item.id);
			},
			onDrop(evt) {
				let element = evt.target.parentElement;
				while (element.id == '') {
					element = element.parentElement;
				}
				let droppedId = evt.dataTransfer.getData('itemID');
				const elementId = element.title;
				let chartsArray = moveInArray(
					droppedId,
					elementId,
					store.getters.getUserCharts
				);
				store.dispatch('setUserCharts', chartsArray);
			},
			fetchUserCharts() {
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'charts/' +
							store.getters.getUserId
					)
					.then(res => {
						store.dispatch('setUserCharts', res.data.charts);
					});
			},
			showChartList() {
				this.chartListIsShown = !this.chartListIsShown;
			},
			addChartToList(chart) {
				store.dispatch('addChartToUserList', chart);
				this.showChartList();
				this.saveChartDataToDB();
			},
			fetchDataInDateRange() {
				this.loading = true;
				let data = store.getters.getDateRange.range;
				data.userId = store.getters.getUserId;
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/dateRange',
						{
							params: data,
						}
					)
					.then(res => {
						store.dispatch('setUserChartData', {
							name: 'heart_rate',
							data: res.data.timeInZones.timeInHeartZones,
						});
						store.dispatch('setUserChartData', {
							name: 'power',
							data: res.data.timeInZones.timeInPowerZones,
						});
						let peaks = Object.keys(res.data.peaks).reduce(
							(arr, e) => {
								arr.push(res.data.peaks[e]);
								return arr;
							},
							[]
						);
						store.dispatch('setUserChartData', {
							name: 'peakPower',
							data: [['data', ...peaks]],
						});
						this.loading = false;
					});
			},

			removeChart(index) {
				store.dispatch('removeChart', index);
				this.saveChartDataToDB();
			},
			saveChartDataToDB() {
				axios.post(
					import.meta.env.VITE_SERVER_URI +
						'charts/' +
						store.getters.getUserId,
					{
						charts: store.getters.getUserCharts,
					}
				);
			},
		},
		computed: {
			userCharts() {
				return store.getters.getUserCharts;
			},
			chartList() {
				return store.getters.getChartList;
			},
		},
		mounted() {
			this.fetchUserCharts();
			this.fetchDataInDateRange();
		},
	};
</script>
<style scoped>
	.dashboard {
		height: 93vh;
	}
	.chart-button {
		width: 50%;
	}
</style>
