<template>
	<div class="grid grid-cols-2">
		<label class="text-right mr-5" for="distance">Heart Rate</label>
		<div class="flex flex-row w-3/4">
			<select
				class="rounded-r-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				v-model="heartRateMetric"
			>
				<option value="above">Above</option>
				<option value="below">Below</option>
			</select>
			<input
				class="text-right rounded-l-md border border-r-0 border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				type="number"
				v-model="bpm"
			/>
			<span
				class="rounded-r-md border border-slate-500 bg-slate-300 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>bpm</span
			>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bpm: 0,
				heartRateMetric: 'above',
			};
		},
	};
</script>
