<template>
	<div class="mb-5 max-w-full pr-3">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Power
		</h1>
		// TODO save zones
		<div class="w-3/4 mx-auto mt-5">
			<div class="grid grid-cols-4 mb-1">
				<div class="grid grid-cols-2">
					<input class="mx-3" id="ftp" v-model="FTP" /><label
						for="ftp"
						>FTP</label
					>
				</div>
			</div>

			<div class="grid grid-cols-3 w-80">
				<div class="text-center">Watts</div>
				<div class="text-center">%</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone1Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone1percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 1 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone2Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone2percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 2 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone3Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone3percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 3 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone4Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone4percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 4 Max</div>
			</div>
			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone5Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone5percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 5 Max</div>
			</div>

			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone6Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone6percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 6 Max</div>
			</div>

			<div class="grid grid-cols-3 w-80 mb-1">
				<input
					class="mx-3"
					v-model="zone7Watts"
					@change="calculatePercentage"
				/>
				<div class="grid grid-cols-3">
					<input
						class="mx-3 col-span-2"
						v-model="zone7percent"
						@change="calculateWatts"
					/><span>%</span>
				</div>
				<div>Zone 7 Max</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'power-section',
		data() {
			return {
				FTP: 168,
				zone1Watts: 135,
				zone1percent: null,
				zone2Watts: 150,
				zone2percent: null,
				zone3Watts: 156,
				zone3percent: null,
				zone4Watts: 157,
				zone4percent: null,
				zone5Watts: 167,
				zone5percent: null,
				zone6Watts: 167,
				zone6percent: null,
				zone7Watts: 167,
				zone7percent: null,
			};
		},
		methods: {
			calculateWatts() {
				this.zone1Watts = Math.round(
					this.percentageOf(this.zone1percent, this.FTP)
				);
				this.zone2Watts = Math.round(
					this.percentageOf(this.zone2percent, this.FTP)
				);
				this.zone3Watts = Math.round(
					this.percentageOf(this.zone3percent, this.FTP)
				);
				this.zone4Watts = Math.round(
					this.percentageOf(this.zone4percent, this.FTP)
				);
				this.zone5Watts = Math.round(
					this.percentageOf(this.zone5percent, this.FTP)
				);
			},
			calculatePercentage() {
				this.zone1percent = Math.round(
					this.percentage(this.zone1Watts, this.FTP)
				);
				this.zone2percent = Math.round(
					this.percentage(this.zone2Watts, this.FTP)
				);
				this.zone3percent = Math.round(
					this.percentage(this.zone3Watts, this.FTP)
				);
				this.zone4percent = Math.round(
					this.percentage(this.zone4Watts, this.FTP)
				);
				this.zone5percent = Math.round(
					this.percentage(this.zone5Watts, this.FTP)
				);
			},
			percentageOf(partialValue, totalValue) {
				return (totalValue / 100) * partialValue;
			},
			percentage(partialValue, totalValue) {
				return (100 * partialValue) / totalValue;
			},
		},
		watch: {
			FTP() {
				// Zone 1 Less than 55% of FTPw
				// Zone 2 55% to 74% of FTPw
				// Zone 3 75% to 89% of FTPw
				// Zone 4 90% to 104% of FTPw
				// Zone 5 105% to 120% of FTPw
				// Zone 6 More than 120% of FTPw
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
