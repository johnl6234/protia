<script setup>
	import { defineAsyncComponent } from 'vue';
	import { RouterLink, RouterView } from 'vue-router';
	import TheTopNav from './components/base/TheTopNav.vue';
	import TheSideNav from './components/base/TheSideNav.vue';
	import BaseOverlay from './components/base/BaseOverlay.vue';
	const AuthView = defineAsyncComponent(() => import('./views/AuthView.vue'));
</script>

<template>
	<AuthView v-if="!loggedIn" />
	<div v-else class="app-container overflow-hidden md:w-full lg:w-5/6">
		<TheTopNav />
		<div class="flex flex-row overflow-hidden bottom-container">
			<TheSideNav />
			<BaseOverlay v-if="isLoading" :loading="isLoading" />
			<RouterView v-else />
		</div>
	</div>
</template>

<script>
	import store from './store';
	export default {
		data() {
			return {
				isLoading: false,
			};
		},
		computed: {
			loading() {
				return store.getters.isLoading;
			},
			loggedIn() {
				return store.getters.isLoggedIn;
			},
		},
		watch: {
			loading(newVal) {
				this.isLoading = newVal;
			},
		},
		created() {
			let token = localStorage.getItem('accessToken');
			if (token) {
				store.dispatch('autoLogin', token);
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
