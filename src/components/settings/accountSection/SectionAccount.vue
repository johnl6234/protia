<template>
	<SubSectionProfile ref="Profile" class="w-full p-3" />
	<SubSectionSettings ref="Settings" class="w-full p-3 min-h" />
	<SubSectionEmail ref="Email Options" class="w-full p-3 min-h" />
	<SubSectionCalendar ref="Calendar" class="w-full p-3 min-h" />
</template>
<script>
	import SubSectionProfile from './SubSectionProfile.vue';
	import SubSectionSettings from './SubSectionSettings.vue';
	import SubSectionEmail from './SubSectionEmail.vue';
	import SubSectionCalendar from './SubSectionCalendar.vue';

	export default {
		name: 'section-account',
		components: {
			SubSectionProfile,
			SubSectionSettings,
			SubSectionEmail,
			SubSectionCalendar,
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
	.min-h {
		min-height: 200px !important;
	}
</style>
