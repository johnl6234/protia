<template>
	<Menu as="div" class="relative inline-block text-left">
		<div>
			<MenuButton
				class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
			>
				<ChartBar class="chart-button" />
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<MenuItems
				class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white"
			>
				<div class="py-1">
					<MenuItem v-slot="{ active }" v-for="chart in chartList">
						<div
							:key="chart"
							:id="chart.id"
							@click="$emit('addChartToList', chart)"
							class="cursor-pointer p-3 text-center"
							:class="[active ? 'bg-gray-100 text-gray-900' : '']"
						>
							{{ chart.title }}
						</div>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup>
	import { defineAsyncComponent } from 'vue';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
	const ChartBar = defineAsyncComponent(() =>
		import('vue-material-design-icons/ChartBar.vue')
	);
</script>

<script>
	export default {
		props: ['chartList'],
	};
</script>
