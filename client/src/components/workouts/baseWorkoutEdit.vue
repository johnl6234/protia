<template>
	<div class="p-5">
		<h2 class="font-bold">Details</h2>
		<div class="grid grid-cols-2">
			<label class="text-right mr-5">Step Type</label>
			<select
				v-model="lapType"
				class="rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="" disabled>-- Select an option --</option>
				<option
					v-for="lapType in lapTypes"
					:key="lapType"
					:value="lapType"
				>
					{{ lapType }}
				</option>
			</select>
		</div>
		<h2 class="font-bold">Duration</h2>
		<div class="grid grid-cols-2">
			<label class="text-right mr-5">Type</label>
			<select
				v-model="durationType"
				:onchange="showOptions"
				class="rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="" disabled>-- Select an option --</option>
				<option
					v-for="DurationType in durationTypes"
					:key="DurationType"
					:value="DurationType"
				>
					{{ DurationType.split('_').join(' ') }}
				</option>
			</select>
		</div>
		<h2 class="font-bold">Target</h2>
		<div class="grid grid-cols-2">
			<label class="text-right mr-5">Type</label>
			<select
				v-model="targetType"
				:onchange="showOptions"
				class="rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="" disabled>-- Select an option --</option>
				<option
					v-for="targetType in targetTypes"
					:key="targetType"
					:value="targetType"
				>
					{{ targetType.split('_').join(' ') }}
				</option>
			</select>
		</div>
		<div class="flex justify-end">
			<button
				@click.prevent="saveLapEdits"
				class="py-1 px-2 bg-blue-600 text-white rounded-md"
			>
				Done
			</button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'workout-edit',
		props: ['lap'],
		data() {
			return {
				options: null,
				lapType: '',
				lapTypes: ['warmup', 'coolDown', 'active', 'rest'],
				durationType: '',
				durationTypes: [
					'time',
					'distance',
					'lap_button_pressed',
					'heart rate',
				],
				targetType: '',
				targetTypes: ['pace', 'cadence', 'heart_rate_zone', 'power'],
			};
		},
		methods: {
			saveLapEdits() {
				let data = {
					lapType: this.lapType,
					durationType: this.durationType,
					targetType: this.targetType,
				};
				this.$emit('saveEdits', data);
			},
			showOptions(e) {
				console.log('event', e.target.selectedOptions[0]._value);
			},
		},
		created() {
			console.log('sport', this.lap.lapType);
			this.lapType = this.lap.lapType;
			this.durationType = this.lap.durationType;
			this.targetType = this.lap.targetType;
		},
	};
</script>
