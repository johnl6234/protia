<template>
	<component :is="selectedComponent" @switchScreen="switchTo"></component>
</template>

<script>
	import TheLogin from '../components/auth/TheLogin.vue';
	import TheRegister from '../components/auth/TheRegister.vue';
	export default {
		components: {
			TheLogin,
			TheRegister,
		},
		data() {
			return {
				selectedComponent: 'the-login',
			};
		},
		methods: {
			switchTo(screen) {
				this.selectedComponent = screen;
			},
		},
	};
</script>
