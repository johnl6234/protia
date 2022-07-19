<template>
	<SubSectionHeartRate ref="Heart Rate" class="w-full half-screen" />
	<SubSectionPower ref="Power" class="w-full half-screen" />
	<!--  <SubSectionPaceSpeed ref="Speed/Pace" class="w-full" />    -->
</template>
<script>
	import SubSectionHeartRate from './SubSectionHeartRate.vue';
	import SubSectionPower from './SubSectionPower.vue';
	import SubSectionPaceSpeed from './SubSectionPaceSpeed.vue';
	export default {
		name: 'section-zones',
		components: {
			SubSectionHeartRate,
			SubSectionPower,
			SubSectionPaceSpeed,
		},
		props: {
			toSubSection: String,
		},
		watch: {
			toSubSection() {
				var element = this.$refs[this.toSubSection];
				if (element) element.$el.scrollIntoView({ behavior: 'smooth' });
			},
		},
	};
</script>

<style scoped>
	.half-screen {
		height: 50vh;
	}
</style>
