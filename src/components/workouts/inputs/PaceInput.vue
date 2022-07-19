<template>
	<div class="grid grid-cols-2">
		<label class="text-right mr-5" for="distance">Pace</label>
		<div class="flex flex-row w-3/4">
			<input
				class="text-right rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				type="number"
				v-model="paceFrom"
			/>
			<span class="mx-2"> to </span>
			<input
				class="text-right rounded-l-md border border-r-0 border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				type="number"
				v-model="paceTo"
			/>
			<span
				class="rounded-r-md border border-slate-500 bg-slate-300 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				/mi
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paceFrom: 0,
				paceTo: 0,
			};
		},
	};
</script>
