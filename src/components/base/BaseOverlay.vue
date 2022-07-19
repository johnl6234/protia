<template>
	<div
		v-if="loading"
		class="absolute flex justify-center items-center top-0 left-0 w-full h-screen bg-black opacity-75 z-50"
	>
		<LoadingSpinner />
	</div>
</template>

<script>
	import { defineAsyncComponent } from 'vue';

	const LoadingSpinner = defineAsyncComponent(() =>
		import('./LoadingSpinner.vue')
	);
	export default {
		props: ['loading'],
		components: {
			LoadingSpinner,
		},
	};
</script>
