<template>
	<div class="home grid grid-cols-4 pt-3 w-full">
		<BaseOverlay :loading="loading" />
		<div class="px-3 bg-zinc-300">left Column</div>
		<div class="px-3 col-span-2">
			<h1
				class="border-b text-blue-500 text-xl font-light border-zinc-400 mb-3"
			>
				Today
			</h1>
			<HomeWorkout :day="'Today'" />
			<h1
				class="border-b text-blue-500 text-xl font-light border-zinc-400 mb-3"
			>
				Tomorrow
			</h1>
			<HomeWorkout :day="'Tomorrow'" />
		</div>
		<div class="px-3 bg-zinc-300">
			right Column
			<StatsDisplay />
		</div>
	</div>
</template>

<script>
	import HomeWorkout from '../components/home/HomeWorkout.vue';
	import StatsDisplay from '../components/home/StatsDisplay.vue';
	import BaseOverlay from '../components/base/BaseOverlay.vue';
	import axios from 'axios';
	import store from '../store';
	export default {
		components: {
			HomeWorkout,
			StatsDisplay,
			BaseOverlay,
		},
		data() {
			return {
				loading: false,
				stats: {},
			};
		},
		methods: {
			getStatsData() {
				const userId = store.getters.getUserId;
				if (userId == undefined) return;
				axios
					.get(import.meta.env.VITE_SERVER_URI + 'stats/' + userId)
					.then(response => {
						this.stats = response.data;
					});
			},
		},
		mounted() {
			this.getStatsData();
		},
	};
</script>

<style scoped>
	.home {
		height: 90vh;
	}
</style>
