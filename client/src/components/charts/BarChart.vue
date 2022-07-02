<template>
	<div :id="'barChart-' + chartId" class="w-full h-full"></div>
</template>

<script>
	import { bb, bar } from 'billboard.js';
	import 'billboard.js/dist/billboard.css';
	export default {
		name: 'bar-chart',
		props: {
			chartId: Number,
			chartData: Object,
		},
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
					bindto: `#barChart-${chartId}`,
					data: {
						// for ESM import usage, import 'line' module and execute it as
						type: bar(),
						//type: "line",
						columns: chartData.columns,
						colors: {
							zone1: '#ff0000',
							zone2: '#9900ff',
							zone3: '#0000ff',
							zone4: '#00ff00',
							zone5: '#ffb700',
						},
					},
					bar: {
						width: {
							ratio: 0.5,
						},
						padding: 5,
					},
				});
			},
		},
		watch: {
			chartData: {
				handler(newValue, oldValue) {
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
