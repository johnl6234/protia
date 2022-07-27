<template>
	<div class="data">
		Stats Data
		<BarChart :chartId="chartId" :chartData="chartData" />
	</div>
</template>

<script>
	import { makeId } from '../../utils/utils';
	import BarChart from '../charts/BarChart.vue';

	export default {
		name: 'stats-data',
		props: ['workout'],
		components: { BarChart },
		data() {
			return {
				chartId: makeId(5),
			};
		},
		computed: {
			chartData() {
				return { columns: this.workout.timeInZones.heart_rate };
			},
		},
		created() {
			console.log('workout', this.workout);
		},
	};
</script>

<style scoped>
	.data {
		min-height: 50vh;
	}
</style>
