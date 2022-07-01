<template>
	<div class="flex flex-row mb-10 dashboard">
		<div class="flex flex-col w-40 bg-slate-50">
			<button
				@click="showChartList"
				class="flex justify-center bg-neutral-200 m-3 rounded-lg p-3"
			>
				<ChartBarIcon class="chart-button" />
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
			<div class="w-full p-2 bg-slate-50 border-l border-b-8 shadow-lg">
				<DateRange @getData="fetchDataInDateRange" />
			</div>
			<div
				class="flex flex-row flex-wrap overflow-scroll overflow-x-hidden mb-3"
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
						<Component
							v-if="chart.component"
							:is="chart.component"
							:chartId="chart.id"
							:data="chart.data"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { shallowRef, markRaw } from 'vue';
	import LineChartVue from '../components/charts/LineChart.vue';
	import BarChartVue from '../components/charts/BarChart.vue';
	import PieChartVue from '../components/charts/PieChart.vue';
	import axios from 'axios';
	const LineChart = markRaw(LineChartVue);
	const BarChart = markRaw(BarChartVue);
	const PieChart = markRaw(PieChartVue);
	import { ChartBarIcon } from '@heroicons/vue/outline';
	import DateRange from '../components/dashboard/DateRange.vue';
	export default {
		name: 'dashboard-page',
		components: {
			LineChart,
			BarChart,
			PieChart,
			ChartBarIcon,
			DateRange,
		},
		data() {
			return {
				chartListIsShown: false,
				chartList: [
					{
						id: 0,
						title: 'Time in Hr/Zones',
						order: 0,
						component: BarChart,
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
						component: BarChart,
						data: {
							columns: [['power', 120, 320, 230, 120, 160, 430]],
						},
					},
				],
				userCharts: [],
				chartDataInRange: {},
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
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'charts/' +
							this.$store.getters.getUserData._id
					)
					.then(res => {
						this.$store.commit('setUserCharts', res.data);
						this.userCharts = res.data;
						console.log('results', res.data);
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
			},
			fetchDataInDateRange() {
				let dateRange = this.$store.getters.setDateRange;
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/dateRange',
						{ params: dateRange.value }
					)
					.then(res => {
						console.log('results', res.data);
						this.chartDataInRange = res.data;
					});
			},
		},
		mounted() {
			if (this.$store.getters.getUserChartsLength < 0) this.fetchCharts();
			else this.userCharts = this.$store.getters.getUserCharts;
		},
	};
</script>
<style scoped>
	.dashboard {
		height: 90vh;
	}
	.chart-button {
		width: 50%;
	}
</style>
