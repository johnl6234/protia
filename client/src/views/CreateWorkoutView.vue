<template>
	<h1
		class="border-b text-blue-500 text-xl font-light border-zinc-400 h-full"
	>
		Create Workout
	</h1>
</template>

<script>
	export default {
		props: ['date'],
		created() {
			console.log('date', this.date);
			console.log('params', this.$route.params.type);
		},
	};
</script>
