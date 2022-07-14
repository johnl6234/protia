<template>
	<div class="mb-5 max-w-full pr-3">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Power
		</h1>
		<div class="w-3/4 mx-auto mt-5">
			<div class="grid grid-cols-4 mb-1">
				<div class="grid grid-cols-2">
					<input
						class="mx-3"
						id="ftp"
						v-model="FTP"
						@change="changeFTP"
					/><label for="ftp">FTP</label>
				</div>
			</div>

			<div class="grid grid-cols-3 w-80">
				<div class="text-center">Watts</div>
				<div class="text-center">%</div>
			</div>
			<!-- Display Zones -->
			<div>
				<ZoneInputPower v-for="zone in powerZones" :zoneData="zone" />
			</div>
		</div>
	</div>
</template>

<script>
	import ZoneInputPower from './zoneComponents/ZoneInputPower.vue';
	export default {
		name: 'power-section',
		components: { ZoneInputPower },
		data() {
			return {
				FTP: 168,
				powerZones: [],
			};
		},
		methods: {
			changeFTP() {
				const newPowerZones = [
					{
						number: 1,
						watts: Math.round((this.FTP / 100) * 55),
						percent: 55,
					},
					{
						number: 2,
						watts: Math.round((this.FTP / 100) * 75),
						percent: 75,
					},
					{
						number: 3,
						watts: Math.round((this.FTP / 100) * 90),
						percent: 90,
					},
					{
						number: 4,
						watts: Math.round((this.FTP / 100) * 105),
						percent: 105,
					},
					{
						number: 5,
						watts: Math.round((this.FTP / 100) * 120),
						percent: 120,
					},

					{
						number: 6,
						watts: Math.round((this.FTP / 100) * 200),
						percent: 200,
					},

					{
						number: 7,
						watts: Math.round((this.FTP / 100) * 400),
						percent: 400,
					},
				];
				let payload = {
					name: 'power',
					zones: newPowerZones,
				};
				this.$store.dispatch('changeAllZones', payload);
				this.$store.dispatch('setFtp', this.ftp);
			},
		},
		watch: {
			zones(newZones) {
				this.powerZones = newZones;
			},
		},
		computed: {
			zones() {
				return this.$store.getters.getZones.power;
			},
		},
		created() {
			this.powerZones = this.zones;
			this.FTP = this.$store.getters.getFtp;
		},
	};
</script>
<style scoped>
	/* div {
		border: 1px solid red;
	} */
</style>
