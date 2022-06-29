<template>
	<div class="h-screen">
		<SubSectionProfile ref="Profile" class="w-full" />
		<SubSectionSettings ref="Settings" class="h-screen w-full" />
	</div>
</template>
<script>
	import SubSectionProfile from './SubSectionProfile.vue';
	import SubSectionSettings from './SubSectionSettings.vue';
	export default {
		name: 'section-account',
		components: { SubSectionProfile, SubSectionSettings },
		props: {
			currentSubLink: String,
		},
		watch: {
			currentSubLink() {
				var element = this.$refs[this.currentSubLink];
				if (element) element.$el.scrollIntoView({ behavior: 'smooth' });
			},
		},
	};
</script>
