<template>
	<div class="grid grid-cols-2">
		<label class="text-right mr-5" for="distance">Zone</label>
		<div class="flex flex-row w-full">
			<select
				class="rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				v-model="zone"
			>
				<option value="zone1">Zone 1</option>
				<option value="zone2">Zone 2</option>
				<option value="zone3">Zone 3</option>
				<option value="zone4">Zone 4</option>
				<option value="zone5">Zone 5</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				zone: 'zone3',
			};
		},
	};
</script>
