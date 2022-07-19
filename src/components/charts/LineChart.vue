<template>
	<div :id="chartId" class="w-full h-full"></div>
</template>

<script>
	import { bb, line } from 'billboard.js';
	import 'billboard.js/dist/billboard.css';
	export default {
		name: 'line-chart',
		props: ['chartId', 'chartData'],
		data() {
			return {
				chart: null,
			};
		},
		methods: {
			initChart() {
				let chartId = this.chartId;
				let chartData = this.chartData;
				this.chart = bb.generate({
					bindto: `#${chartId}`,
					data: {
						type: line(),
						columns: chartData.columns,
					},
					axis: {
						x: {
							tick: {
								fit: true,
								//culling: false,
								values: [
									'3-sec',
									'10-sec',
									'30-sec',
									'1-min',
									'20-min',
								],
							},
						},
					},
				});
			},
		},
		watch: {
			chartData: {
				handler(newValue, oldValue) {
					this.chart.load({
						columns: newValue.columns,
					});
				},
				deep: true,
			},
		},
		mounted() {
			this.initChart();
		},
	};
</script>
