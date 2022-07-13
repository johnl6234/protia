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
						// for ESM import usage, import 'line' module and execute it as
						type: line(),
						//type: "line",
						columns: chartData.columns,
					},
					zoom: {
						// for ESM import usage, import 'zoom' module and execute it as
						// enabled: zoom()
						enabled: true,
					},
				});
			},
		},
		watch: {
			chartData: {
				handler(newValue, oldValue) {
					console.log('new line chart data', newValue);
					this.chart.load({
						columns: this.chartData.columns,
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
