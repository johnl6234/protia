<template>
	<div class="grid grid-cols-2">
		<label class="text-right mr-5" for="distance">Distance</label>
		<div class="flex flex-row w-3/4">
			<input
				class="text-right rounded-l-md border border-r-0 border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				type="number"
				v-model="distance"
			/>
			<select
				class="rounded-r-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				v-model="distanceMetric"
			>
				<option value="mi">mi</option>
				<option value="km">km</option>
				<option value="m">m</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				distance: 1.0,
				distanceMetric: 'mi',
			};
		},
	};
</script>
