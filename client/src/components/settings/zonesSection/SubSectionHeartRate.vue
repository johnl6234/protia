<template>
	<div class="mb-5 max-w-full pr-3">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Heart Rate
		</h1>
		// TODO save zones
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
			<!-- Display Zones -->
			<div>
				<ZoneInput v-for="zone in zones" :zoneData="zone" />
			</div>
		</div>
	</div>
</template>

<script>
	import ZoneInput from './zoneComponents/ZoneInput.vue';
	export default {
		name: 'heartRate-section',
		components: { ZoneInput },
		data() {
			return {
				basedOn: 'thresholdHR',
				maxHr: 185,
				ltThreshold: 168,
			};
		},
		watch: {
			zones(newVal, oldVal) {
				console.log('zones old', oldVal, 'new', newVal);
			},
		},
		computed: {
			zones() {
				return this.$store.getters.getZones.heart_rate;
			},
		},
	};
</script>
