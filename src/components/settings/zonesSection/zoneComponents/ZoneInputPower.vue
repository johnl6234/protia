<template>
	<div class="grid grid-cols-3 w-80 mb-1">
		<input
			type="number"
			class="mx-3"
			v-model="zone.watts"
			@change="calculatePercentage"
		/>
		<div class="grid grid-cols-3">
			<input
				type="number"
				class="mx-3 col-span-2"
				v-model="zone.percent"
				@change="calculateWatts"
			/><span>%</span>
		</div>
		<div>Zone {{ zone.number }} Max</div>
	</div>
</template>
<script>
	export default {
		props: ['zoneData'],
		data() {
			return {
				zone: {
					number: null,
					watts: null,
					percent: null,
				},
			};
		},
		methods: {
			calculateWatts() {
				this.zone.bpm = Math.round(
					this.percentageOf(this.zone.percent, this.ftp)
				);
				this.$store.dispatch('changeZone', {
					name: 'power',
					zone: this.zone,
				});
			},
			calculatePercentage() {
				this.zone.percent = Math.round(
					this.percentage(this.zone.watts, this.ftp)
				);
				this.$store.dispatch('changeZone', {
					name: 'power',
					zone: this.zone,
				});
			},
			percentageOf(partialValue, totalValue) {
				return (totalValue / 100) * partialValue;
			},
			percentage(partialValue, totalValue) {
				return (100 * partialValue) / totalValue;
			},
		},
		computed: {
			ftp() {
				return this.$store.getters.getFtp;
			},
		},
		watch: {
			zoneData(newVal, oldVal) {
				this.zone = newVal;
			},
		},
		created() {
			this.zone = this.zoneData;
		},
	};
</script>
