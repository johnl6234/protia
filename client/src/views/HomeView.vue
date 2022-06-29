<template>
	<div class="home grid grid-cols-4 pt-3">
		<div class="px-3 bg-zinc-300">left Column</div>
		<div class="px-3 col-span-2">
			<h1
				class="border-b text-blue-500 text-xl font-light border-zinc-400"
			>
				Today
			</h1>
			<HomeWorkout :day="'Today'" />
			<h1
				class="border-b text-blue-500 text-xl font-light border-zinc-400"
			>
				Tomorrow
			</h1>
			<HomeWorkout :day="'Tomorrow'" />
		</div>
		<div class="px-3 bg-zinc-300">right Column</div>
	</div>
</template>

<script>
	import HomeWorkout from '../components/home/HomeWorkout.vue';
	export default {
		components: {
			HomeWorkout,
		},
		data() {},
		created() {},
	};
</script>

<style scoped>
	.home {
		height: 90vh;
	}
</style>
