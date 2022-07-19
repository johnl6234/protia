<script setup>
	import { RouterLink, RouterView } from 'vue-router';
	import TheTopNav from './components/base/TheTopNav.vue';
	import AuthView from './views/AuthView.vue';
	import TheSideNav from './components/base/TheSideNav.vue';
</script>

<template>
	<AuthView v-if="!this.$store.getters.isLoggedIn" />
	<div v-else class="app-container overflow-hidden md:w-full lg:w-5/6">
		<TheTopNav />
		<div class="flex flex-row overflow-hidden bottom-container">
			<TheSideNav />
			<RouterView />
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created() {
			let token = localStorage.getItem('accessToken');
			if (token) {
				this.$store.dispatch('autoLogin', token);
			}
		},
	};
</script>
<style>
	@import '@/assets/base.css';
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap');
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		margin-left: auto;
		margin-right: auto;
		max-height: 98vh;
		overflow: hidden;
	}

	.app-container {
		position: relative;
		background-color: var(--color-grey-1);
		height: 98vh;
		margin: auto;
	}
	.bottom-container {
		height: 92vh;
	}
</style>
