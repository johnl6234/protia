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
	import LineChart from '../components/charts/LineChart.vue';
	import BarChart from '../components/charts/BarChart.vue';
	import PieChart from '../components/charts/PieChart.vue';
	import axios from 'axios';
	import ChartBar from 'vue-material-design-icons/ChartBar.vue';
	import DateRange from '../components/dashboard/DateRange.vue';
	import { getTimeInZones } from '../utils/utils';
	import BaseOverlay from '../components/base/BaseOverlay.vue';
	import ChartListDrop from '../components/dashboard/ChartListDrop.vue';

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
				this.moveInArray(droppedId, elementId);
			},
			moveInArray(movingId, placeId) {
				let chartsArray = this.$store.getters.getUserCharts.map(
					chart => chart
				);
				let placeChart = chartsArray.find(el => el.id == placeId);
				let toOrder;
				if (placeChart) toOrder = placeChart.order;
				else toOrder = this.$store.getters.getUserChartsLength + 1;
				chartsArray.forEach(chart => {
					if (chart.order >= toOrder && chart.id != movingId)
						chart.order++;
				});

				let droppedChart = chartsArray.find(el => el.id == movingId);
				droppedChart.order = toOrder;
				chartsArray.sort((a, b) => a.order - b.order);
				chartsArray.forEach(
					(chart, index) => (chart.order = index + 1)
				);
				this.$store.dispatch('setUserCharts', chartsArray);
			},
			fetchUserCharts() {
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'charts/' +
							this.$store.getters.getUserId
					)
					.then(res => {
						this.$store.dispatch('setUserCharts', res.data.charts);
					});
			},
			showChartList() {
				this.chartListIsShown = !this.chartListIsShown;
			},
			addChartToList(chart) {
				this.$store.dispatch('addChartToUserList', chart);
				this.showChartList();
				this.saveChartDataToDB();
			},
			fetchDataInDateRange() {
				this.loading = true;
				let dateRange = this.$store.getters.getDateRange;
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
				const zones = this.$store.getters.getZones;
				let heartData = [];
				let powerData = [];
				chartDataInRange.forEach(activity => {
					heartData.push(...activity.heart_rate);
					powerData.push(...activity.power);
				});
				let sortedHeartData = getTimeInZones(
					'heart_rate',
					zones.heart_rate,
					heartData
				);
				let sortedPowerData = getTimeInZones(
					'power',
					zones.power,
					powerData
				);

				this.$store.dispatch('setUserChartData', {
					name: 'heart_rate',
					data: sortedHeartData,
				});
				this.$store.dispatch('setUserChartData', {
					name: 'power',
					data: sortedPowerData,
				});

				this.rangedChartData = {
					heart_rate: sortedHeartData,
					power: sortedPowerData,
				};
				console.log('chart data', this.rangedChartData);
				this.loading = false;
				this.saveChartDataToDB();
			},
			removeChart(index) {
				this.$store.dispatch('removeChart', index);
				this.saveChartDataToDB();
			},
			saveChartDataToDB() {
				axios.post(
					import.meta.env.VITE_SERVER_URI +
						'charts/' +
						this.$store.getters.getUserId,
					{
						charts: this.$store.getters.getUserCharts,
					}
				);
			},
		},
		computed: {
			userCharts() {
				return this.$store.getters.getUserCharts;
			},
			chartList() {
				return this.$store.getters.getChartList;
			},
		},
		watch: {
			userCharts(newVal, oldVal) {
				console.log('new', newVal, 'old', oldVal);
			},
		},
		mounted() {
			//if (this.$store.getters.getUserChartsLength < 1)
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
