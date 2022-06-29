<template>
	<div class="h-screen">
		<SubSectionProfile ref="Profile" class="h-screen w-full" />
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
			currentSubLink(subLink) {
				console.log('string', this.currentSubLink);
				console.log('subLink', this.$refs[this.currentSubLink]);
				var element = this.$refs[this.currentSubLink];
				var top = element.offsetTop;

				window.scrollTo(0, top);
			},
		},
	};
</script>
