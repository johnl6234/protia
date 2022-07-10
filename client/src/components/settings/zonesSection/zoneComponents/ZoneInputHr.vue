<template>
	<div class="grid grid-cols-3 w-80 mb-1">
		<input
			type="number"
			class="mx-3"
			v-model="zone.bpm"
			@change="calculatePercentage"
		/>
		<div class="grid grid-cols-3">
			<input
				type="number"
				class="mx-3 col-span-2"
				v-model="zone.percent"
				@change="calculateBpm"
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
					bpm: null,
					percent: null,
				},
			};
		},
		methods: {
			calculateBpm() {
				this.zone.bpm = Math.round(
					this.percentageOf(this.zone.percent, this.ltThreshold)
				);
				this.$store.dispatch('changeZone', {
					name: 'heart_rate',
					zone: this.zone,
				});
			},
			calculatePercentage() {
				this.zone.percent = Math.round(
					this.percentage(this.zone.bpm, this.ltThreshold)
				);
				this.$store.dispatch('changeZone', {
					name: 'heart_rate',
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
			ltThreshold() {
				return this.$store.getters.getLtThreshold;
			},
		},
		watch: {
			zoneData(newVal, oldVal) {
				console.log('new zoneData', newVal, 'old', oldVal);
				this.zone = newVal;
			},
		},
		created() {
			this.zone = this.zoneData;
			//this.calculatePercentage();
		},
	};
</script>
