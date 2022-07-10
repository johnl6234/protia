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
							@change="changeLTHR"
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
				<ZoneInput v-for="zone in hrZones" :zoneData="zone" />
			</div>
		</div>
	</div>
</template>

<script>
	import ZoneInput from './zoneComponents/ZoneInputHr.vue';
	export default {
		name: 'heartRate-section',
		components: { ZoneInput },
		data() {
			return {
				basedOn: 'thresholdHR',
				maxHr: 185,
				ltThreshold: 168,
				hrZones: [],
			};
		},
		methods: {
			changeLTHR() {
				console.log('change LTHR');
				const newHrZones = [
					{
						number: 1,
						bpm: Math.round((this.ltThreshold / 100) * 85),
						percent: 85,
					},
					{
						number: 2,
						bpm: Math.round((this.ltThreshold / 100) * 89),
						percent: 89,
					},
					{
						number: 3,
						bpm: Math.round((this.ltThreshold / 100) * 94),
						percent: 94,
					},
					{
						number: 4,
						bpm: Math.round((this.ltThreshold / 100) * 99),
						percent: 99,
					},
					{
						number: 5,
						bpm: Math.round((this.ltThreshold / 100) * 106),
						percent: 106,
					},
				];
				let payload = {
					name: 'heart_rate',
					zones: newHrZones,
				};
				this.$store.dispatch('changeAllZones', payload);
				this.$store.dispatch('setLtThreshold', this.ltThreshold);
				// Zone 1 Less than 85% of LTHR
				// Zone 2 85% to 89% of LTHR
				// Zone 3 90% to 94% of LTHR
				// Zone 4 95% to 99% of LTHR
				// Zone 5a 100% to 102% of LTHR
				// Zone 5b 103% to 106% of LTHR
				// Zone 5c More than 106% of LTHR
			},
		},
		watch: {
			zones(newZones) {
				console.log('changed zones');
				this.hrZones = newZones;
			},
		},
		computed: {
			zones() {
				return this.$store.getters.getZones.heart_rate;
			},
		},
		created() {
			this.hrZones = this.zones;
			this.maxHr = this.$store.getters.getMaxHr;
			this.ltThreshold = this.$store.getters.getLtThreshold;
		},
	};
</script>
