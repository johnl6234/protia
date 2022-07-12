<template>
	<div
		class="mb-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto"
	>
		<div :class="lap.type" class="px-4 py-1 text-slate-50 rounded-t-lg">
			{{ lap.type }}
		</div>
		<div class="flex flex-row justify-evenly p-4">
			<div class="px-6 flex-1 flex-col">
				<div class="font-bold">{{ lap.durationType }}</div>
				<div class="">{{ lap.duration }}</div>
			</div>
			<div class="px-6 flex-1 flex-col">
				<div class="font-bold">{{ lap.targetType }}</div>
				<div class="">{{ lap.target }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'workout-card',
		props: ['lap'],
	};
</script>
<style scoped>
	.warmup {
		background-color: red;
	}
	.active {
		background-color: green;
	}
	.coolDown {
		background-color: dodgerblue;
	}
	/* div {
		border: 1px solid red;
	} */
</style>
