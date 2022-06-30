<template>
	<div class="flex flex-row mb-10 dashboard">
		<div class="flex flex-col w-40 bg-slate-50">
			// TODO Select charts to display
		</div>
		<div class="flex flex-col w-full bg-gray-300">
			<div class="w-full p-2 bg-slate-50 border-l border-b-8 shadow-lg">
				// TODO add date range
			</div>
			<div
				class="flex flex-row flex-wrap overflow-scroll overflow-x-hidden mb-3"
				@drop="onDrop($event, 1)"
				@dragover.prevent
				@dragenter.prevent
			>
				<div
					v-for="chart in charts"
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
	const LineChart = shallowRef(LineChartVue);
	const BarChart = shallowRef(BarChartVue);
	const PieChart = shallowRef(PieChartVue);
	export default {
		components: {
			LineChart,
			BarChart,
			PieChart,
		},
		name: 'dashboard-page',
		data() {
			return {
				charts: [
					{
						id: 0,
						title: 'Item A',
						order: 1,
						component: LineChart,
					},
					{
						id: 1,
						title: 'Item B',
						order: 2,
						component: BarChart,
					},
					{
						id: 2,
						title: 'Item C',
						order: 3,
						component: PieChart,
					},
					{
						id: 3,
						title: 'Item D',
						order: 4,
					},
					{
						id: 4,
						title: 'Item E',
						order: 5,
					},
					{
						id: 5,
						title: 'Item F',
						order: 6,
					},
				],
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
				let chartsArray = this.charts.map(chart => chart);
				let placeChart = chartsArray.find(el => el.id == placeId);
				let toOrder = placeChart.order;
				chartsArray.forEach(chart => {
					if (chart.order >= toOrder && chart.id != movingId)
						chart.order++;
				});

				let droppedChart = chartsArray.find(el => el.id == movingId);
				droppedChart.order = toOrder;
				chartsArray.sort((a, b) => a.order - b.order);
				this.charts = chartsArray;
			},
			fetchCharts() {
				// if (
				// 	this.$store.getters.getUserCharts ||
				// 	this.$store.getters.getUserCharts.length < 0
				// ) {
				axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'charts/' +
							this.$store.getters.getUserData._id
					)
					.then(res => {
						this.$store.commit('setUserCharts', res.data);
						this.charts = res.data;
						console.log('results', res.data);
					});
				// } else {
				// 	console.log('charts exist');
				// }
			},
		},
		mounted() {
			//this.$store.commit('setUserCharts', []);
			this.fetchCharts();
		},
	};
</script>
<style scoped>
	.dashboard {
		height: 90vh;
	}
</style>
