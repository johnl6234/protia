<template>
	<div id="atpChart"></div>
</template>

<script>
	import { bb, bar, spline, line, area, step } from 'billboard.js';
	import TableView from 'billboard.js/dist/plugin/billboardjs-plugin-tableview';
	import 'billboard.js/dist/billboard.css';
	export default {
		name: 'atp-chart',
		props: {
			datesArray: Array,
		},
		methods: {
			initChart() {
				const chart = bb.generate({
					bindto: '#atpChart',
					data: {
						x: 'x',
						columns: [
							['x', ...this.datesArray],
							[
								'Hours',
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
								10,
								12,
								14,
								8,
							],
							[
								'Completed',
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
								9,
								13,
								14,
								6,
							],
						],
						types: {
							Hours: bar(),
							Completed: step(),
						},
					},
					axis: {
						x: {
							tick: {
								fit: false,
								count: 12,
								format: '%Y-%m-%d',
							},
							type: 'timeseries',
						},
					},
					bar: {
						width: {
							ratio: 0.8,
						},
					},
					plugins: [
						new TableView({
							title: 'Year Progress',
							categoryTitle: 'Week',
							style: true,
						}),
					],
				});
			},
		},
		mounted() {
			this.initChart();
		},
	};
</script>

<style scoped></style>
