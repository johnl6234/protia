<template>
	<div class="workout items-center">
		<div class="text-center">
			// TODO create {{ day }}'s workout components
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			day: String,
		},
		name: 'home-workout',
	};
</script>

<style scoped>
	.workout {
		min-height: 200px;
		justify-content: center;
		width: 100%;
	}
</style>
