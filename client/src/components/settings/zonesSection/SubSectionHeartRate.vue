<template>
	<div class="mb-5 max-w-full pr-3">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Heart Rate
		</h1>

		<div class="w-3/4 mx-auto mt-5">
			<div class="grid grid-cols-4 mb-1">
				<label for="based-on">Based on:</label>
				<select v-model="basedOn">
					<option value="thresholdHR">% Hr threshold</option>
					<option value="maxHR">% MAX Hr</option>
				</select>
				<div class="grid grid-cols-2 col-span-2">
					<div class="grid grid-cols-2">
						<input
							class="mx-3"
							id="lthr"
							v-model="ltThreshold"
						/><label for="lthr">hr Lt</label>
					</div>
					<div class="grid grid-cols-2">
						<input class="mx-3" id="maxhr" v-model="maxHr" /><label
							for="maxhr"
							>Max hr</label
						>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 w-80">
				<div class="text-center">bpm</div>
				<div class="text-center">%</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone1bpm"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone1percent"
						@change="calculateBpm"
					/><span>%</span>
				</div>
				<div>Zone 1 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone2bpm"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone2percent"
						@change="calculateBpm"
					/><span>%</span>
				</div>
				<div>Zone 2 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone3bpm"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone3percent"
						@change="calculateBpm"
					/><span>%</span>
				</div>
				<div>Zone 3 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone4bpm"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone4percent"
						@change="calculateBpm"
					/><span>%</span>
				</div>
				<div>Zone 4 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone5bpm"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone5percent"
						@change="calculateBpm"
					/><span>%</span>
				</div>
				<div>Zone 5 Max</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'heartRate-section',
		data() {
			return {
				basedOn: 'thresholdHR',
				maxHr: 185,
				ltThreshold: 168,
				zone1bpm: 135,
				zone1percent: null,
				zone2bpm: 150,
				zone2percent: null,
				zone3bpm: 156,
				zone3percent: null,
				zone4bpm: 157,
				zone4percent: null,
				zone5bpm: 167,
				zone5percent: null,
			};
		},
		methods: {
			calculateBpm() {
				console.log('change');
				this.zone1bpm = Math.round(
					this.percentageOf(this.zone1percent, this.ltThreshold)
				);
				this.zone2bpm = Math.round(
					this.percentageOf(this.zone2percent, this.ltThreshold)
				);
				this.zone3bpm = Math.round(
					this.percentageOf(this.zone3percent, this.ltThreshold)
				);
				this.zone4bpm = Math.round(
					this.percentageOf(this.zone4percent, this.ltThreshold)
				);
				this.zone5bpm = Math.round(
					this.percentageOf(this.zone5percent, this.ltThreshold)
				);
			},
			calculatePercentage() {
				this.zone1percent = Math.round(
					this.percentage(this.zone1bpm, this.ltThreshold)
				);
				this.zone2percent = Math.round(
					this.percentage(this.zone2bpm, this.ltThreshold)
				);
				this.zone3percent = Math.round(
					this.percentage(this.zone3bpm, this.ltThreshold)
				);
				this.zone4percent = Math.round(
					this.percentage(this.zone4bpm, this.ltThreshold)
				);
				this.zone5percent = Math.round(
					this.percentage(this.zone5bpm, this.ltThreshold)
				);
			},
			percentageOf(partialValue, totalValue) {
				return (totalValue / 100) * partialValue;
			},
			percentage(partialValue, totalValue) {
				return (100 * partialValue) / totalValue;
			},
		},
		created() {
			this.calculatePercentage();
		},
	};
</script>
<style scoped>
	/* div {
		border: 1px solid red;
	} */
</style>
