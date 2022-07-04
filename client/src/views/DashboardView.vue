<template>
	<div class="flex flex-row mb-10 dashboard w-full">
		<!-- Loading overlay -->
		<div
			v-if="loading"
			class="absolute top-0 left-0 w-full h-screen bg-black opacity-50 z-50"
		></div>
		<div class="flex flex-col w-40 bg-slate-50">
			<button
				@click="showChartList"
				class="flex justify-center bg-neutral-200 m-3 rounded-lg p-3"
			>
				<ChartBar class="chart-button" />
			</button>
			<div v-if="chartListIsShown" class="p-3">
				<div
					v-for="chart in chartList"
					:key="chart"
					:id="chart.id"
					@click="addChartToList(chart)"
					class="cursor-pointer"
				>
					{{ chart.title }}
				</div>
			</div>
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
					v-for="chart in userCharts"
					:key="chart.id"
					@drop="onDrop($event)"
					@dragover.prevent
					@dragenter.prevent
				>
					<div
						draggable="true"
						@dragstart="startDrag($event, chart)"
						:id="chart.id"
						class="w-64 bg-white m-2 p-2 rounded-md"
					>
						Chart {{ chart.title }}
						<BarChart
							v-if="chart.component == 'BarChart'"
							:chartId="chart.id"
							:chartData="chart.data"
						/>
						<LineChart
							v-if="chart.component == 'LineChart'"
							:chartId="chart.id"
							:chartData="chart.data"
						/>
						<PieChart
							v-if="chart.component == 'PieChart'"
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
	import LineChart from '../components/charts/LineChart.vue';
	import BarChart from '../components/charts/BarChart.vue';
	import PieChart from '../components/charts/PieChart.vue';
	import axios from 'axios';
	import ChartBar from 'vue-material-design-icons/ChartBar.vue';
	import DateRange from '../components/dashboard/DateRange.vue';
	import { getTimeInZones } from '../utils/utils';
	export default {
		name: 'dashboard-page',
		components: {
			LineChart,
			BarChart,
			PieChart,
			ChartBar,
			DateRange,
		},
		data() {
			return {
				loading: false,
				chartListIsShown: false,
				chartList: [
					{
						id: 0,
						title: 'Time in Hr/Zones',
						order: 0,
						component: 'BarChart',
						dataName: 'heart_rate',
						data: {
							columns: [
								['heart_rate', 30, 200, 100, 400, 150, 250],
							],
						},
					},
					{
						id: 0,
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
				let droppedId = evt.dataTransfer.getData('itemID');
				const elementId = evt.toElement.id;
				this.moveInArray(droppedId, elementId);
			},
			moveInArray(movingId, placeId) {
				let chartsArray = this.userCharts.map(chart => chart);
				let placeChart = chartsArray.find(el => el.id == placeId);
				let toOrder = placeChart.order;
				chartsArray.forEach(chart => {
					if (chart.order >= toOrder && chart.id != movingId)
						chart.order++;
				});

				let droppedChart = chartsArray.find(el => el.id == movingId);
				droppedChart.order = toOrder;
				chartsArray.sort((a, b) => a.order - b.order);
				this.userCharts = chartsArray;
			},
			fetchCharts() {
				console.log('getting charts');
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'charts/' +
							this.$store.getters.getUserData._id
					)
					.then(res => {
						console.log('res', res);
						this.$store.commit('setUserCharts', res.data);
						this.userCharts = res.data.charts;
					});
			},
			showChartList() {
				this.chartListIsShown = !this.chartListIsShown;
			},
			addChartToList(chart) {
				let newChart = { ...chart };
				newChart.id = this.userCharts.length;
				newChart.order = this.userCharts.length;
				this.userCharts.push(newChart);
				this.showChartList();
			},
			fetchDataInDateRange() {
				this.loading = true;

				let dateRange = this.$store.getters.setDateRange;
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/dateRange',
						{ params: dateRange.range }
					)
					.then(res => {
						this.groupChartData(res.data.activities);
					});
			},
			groupChartData(chartDataInRange) {
				const zones = {
					name: 'heart_rate',
					// maximum value
					z1: 135,
					z2: 150,
					z3: 156,
					z4: 167,
					z5: 255,
				};
				let heartData = [];
				let powerData = [];
				chartDataInRange.forEach(activity => {
					heartData.push(...activity.heart_rate);
					powerData.push(...activity.power);
				});
				let sortedHeartData = getTimeInZones(zones, heartData);
				let sortedPowerData = getTimeInZones(zones, powerData);

				this.chartList.find(
					chart => chart.dataName == 'heart_rate'
				).data.columns = sortedHeartData;
				this.chartList.find(
					chart => chart.dataName == 'power'
				).data.columns = sortedPowerData;
				this.rangedChartData = {
					heart_rate: sortedHeartData,
					power: sortedPowerData,
				};
			},
			updateChartsData() {
				let newCharts = [...this.userCharts];
				newCharts.forEach(chart => {
					chart.data.columns = this.rangedChartData[chart.dataName];
				});
				this.userCharts = newCharts;
				this.loading = false;
				axios.post(
					import.meta.env.VITE_SERVER_URI +
						'charts/' +
						this.$store.getters.getUserData._id,
					{
						charts: this.userCharts,
					}
				);
			},
		},
		watch: {
			rangedChartData(old, newVal) {
				this.updateChartsData();
			},
			userCharts(old, val) {
				console.log('charts', old, val);
				this.$store.commit('setUserCharts', this.userCharts);
			},
		},

		mounted() {
			if (this.$store.getters.getUserChartsLength <= 0)
				this.fetchCharts();
			else this.userCharts = this.$store.getters.getUserCharts;

			console.log(
				'mounted charts',
				this.$store.getters.getUserChartsLength
			);
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
