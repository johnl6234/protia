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
			data: Object,
		},
		data() {
			return {};
		},
		methods: {
			initChart() {
				let chartId = this.chartId;
				let data = this.data;
				console.log('data', this.data);
				const chart = bb.generate({
					bindto: `#barChart-${chartId}`,
					data: {
						// for ESM import usage, import 'line' module and execute it as
						type: bar(),
						//type: "line",
						columns: data.columns,
						colors: {
							heart_rate: '#ff0000',
							power: '#9900ff',
							speed: '#0000ff',
							elevation: '#00ff00',
							cadence: '#ffb700',
						},
					},
					bar: {
						width: {
							ratio: 0.75,
						},
					},
				});
			},
		},
		mounted() {
			this.initChart();
		},
	};
</script>
