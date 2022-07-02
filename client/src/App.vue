<script setup>
	import { RouterLink, RouterView } from 'vue-router';
	import TheTopNav from './components/TheTopNav.vue';
	import AuthView from './views/AuthView.vue';
	import TheSideNav from './components/TheSideNav.vue';
</script>

<template>
	<AuthView v-if="!this.$store.getters.isLoggedIn" />
	<div v-else class="container overflow-hidden">
		<TheTopNav />
		<div class="flex flex-row">
			<TheSideNav />
			<RouterView class="w-full" />
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		created() {
			let token = localStorage.getItem('accessToken');
			if (token) {
				axios
					.post(
						import.meta.env.VITE_SERVER_URI + 'auth',
						{},
						{
							headers: {
								'x-access-token': token,
							},
						}
					)
					.then(res => {
						if (res.data.success) {
							this.$store.commit('setUserData', res.data.user);
							this.$store.commit('login');
						}
					});
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
		width: 95vw;
		margin-left: auto;
		margin-right: auto;
		max-height: 100vh;
		overflow: hidden;
	}

	.container {
		background-color: var(--color-grey-1);
		margin: auto;
	}
</style>
