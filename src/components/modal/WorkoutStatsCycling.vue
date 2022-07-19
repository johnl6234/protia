<template>
	<div>
		<div class="slidecontainer">
			<input
				type="range"
				min="1"
				max="30"
				v-model="smoothAmount"
				class="slider"
				id="smoothing"
				@change="smoothData"
			/>
		</div>
		<div id="statsChart"></div>
	</div>
</template>

<script>
	import { bb, area, line, zoom } from 'billboard.js';
	import 'billboard.js/dist/billboard.css';
	export default {
		name: 'cycling-stats',
		props: {
			workout: Object,
		},
		data() {
			return {
				smoothedData: {},
				smoothAmount: 15,
				chart: null,
			};
		},
		methods: {
			async smoothData() {
				let newData = {};
				if (this.workout.heart_rate)
					newData.heart_rate = await this.smoothArray(
						this.workout.heart_rate
					);

				if (this.workout.power)
					newData.power = this.smoothArray(this.workout.power);

				if (this.workout.cadence)
					newData.cadence = this.smoothArray(this.workout.cadence);

				if (this.workout.speed)
					newData.speed = this.smoothArray(this.workout.speed);

				if (this.workout.elevation)
					newData.elevation = this.smoothArray(
						this.workout.elevation
					);
				if (this.workout.distance)
					newData.distance = this.smoothArray(this.workout.distance);
				this.smoothedData = newData;
				if (this.chart === null) {
					this.initChart();
				} else {
					this.chart.load({
						columns: [
							['x', ...this.smoothedData.distance],
							['heart_rate', ...this.smoothedData.heart_rate],
							['power', ...this.smoothedData.power],
							['speed', ...this.smoothedData.speed],
							['elevation', ...this.workout.elevation],
							['cadence', ...this.smoothedData.cadence],
						],
					});
				}
			},
			smoothArray(array) {
				let newArray = [];
				let inc = 0;
				for (let i = 0; i < array.length; i++) {
					if (inc == this.smoothAmount) {
						newArray.push(array[i]);
						inc = 0;
					} else {
						inc++;
					}
				}
				return newArray;
			},
			initChart() {
				let thisComponent = this;
				this.chart = bb.generate({
					bindto: `#statsChart`,
					data: {
						x: 'x',
						columns: [
							['x', ...this.smoothedData.distance],
							['heart_rate', ...this.smoothedData.heart_rate],
							['power', ...this.smoothedData.power],
							['speed', ...this.smoothedData.speed],
							['elevation', ...this.workout.elevation],
							['cadence', ...this.smoothedData.cadence],
						],
						axes: {
							heart_rate: 'y2',
							power: 'y2',
						},
						type: line(),
						types: {
							elevation: area(),
						},
						colors: {
							heart_rate: '#ff0000',
							power: '#9900ff',
							speed: '#0000ff',
							elevation: '#00ff00',
							cadence: '#ffb700',
						},
					},

					axis: {
						y: {
							tick: {
								culling: {
									max: 3,
								},
							},
						},
						y2: {
							show: true,
							tick: {
								culling: true,
							},
						},
						x: {
							tick: {
								fit: true,
								multiline: false,
								autorotate: true,
								rotate: 15,
								culling: true,
								max: 10,
								format: function (x) {
									return (x / 1000).toFixed(2);
								},
							},
						},
					},
					point: {
						show: false,
					},
					tooltip: {
						onshow: function (selectedData) {
							thisComponent.$store.commit(
								'setMapPoint',
								selectedData[0].index *
									thisComponent.smoothAmount
							);
						},
						onhide: function () {
							thisComponent.$store.commit('setMapPoint', 0);
						},
					},
					zoom: {
						// for ESM import usage, import 'zoom' module and execute it as
						enabled: zoom(),
						// enabled: true,
					},
				});
			},
		},
		mounted() {
			this.workoutData = this.workout;
			this.smoothData();
		},
	};
</script>

<style>
	.bb-tooltip-container {
		color: black !important;
	}
</style>
