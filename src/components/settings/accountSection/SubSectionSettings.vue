<template>
	<div class="mb-5">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Settings
		</h1>
		<form>
			<div class="grid grid-cols-2">
				<div class="px-4 py-3 col-span-1">
					<div class="grid grid-cols-3 mt-2">
						<label for="measurement" class="block text-gray-700"
							>Unit Preference</label
						>
						<select
							id="unitPreference"
							v-model="userSettings.unitPreference"
							name="unitPreference"
							@change="stoppedEditing"
							autocomplete="unitPreference"
							class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							<option disabled value="">Please select one</option>
							<option value="imperial">Imperial</option>
							<option value="metric">Metric</option>
						</select>
					</div>
					<div class="grid grid-cols-3 mt-2">
						<label for="dateFormat" class="block text-gray-700"
							>Date Format</label
						>
						<select
							id="dateFormat"
							v-model="userSettings.dateFormat"
							name="dateFormat"
							@change="stoppedEditing"
							autocomplete="dateFormat"
							class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							<option disabled value="">Please select one</option>
							<option value="DD/MM/YYYY">DD/MM/YYYY</option>
							<option value="MM/DD/YYYY">MM/DD/YYYY</option>
						</select>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import store from '../../../store';
	export default {
		name: 'settings-section',
		data() {
			return {
				userSettings: {
					unitPreference: 'imperial',
					dateFormat: 'DD/MM/YYYY',
				},
			};
		},
		methods: {
			stoppedEditing() {
				store.commit('setTempData', this.userSettings);
			},
		},
	};
</script>

<style scoped>
	label {
		text-align: right;
		padding-right: 1rem;
		column-span: 1;
		font-weight: 200;
		font-size: smaller;
		vertical-align: center;
	}

	select,
	input {
		font-weight: 200;
		font-size: smaller;
		padding: 2px 4px;
		border: 1px solid #c0b8c9;
	}
</style>
