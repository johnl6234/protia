<template>
	<div class="p-5 border border-blue-500 rounded-md">
		<BaseSelect
			:title="'Details'"
			:typeOptions="lapTypes"
			:optionsArray="'lapTypes'"
			v-model="lapType"
			@showOptions="showOptions"
		/>
		<BaseSelect
			:title="'Duration'"
			:typeOptions="durationTypes"
			:optionsArray="'durationTypes'"
			v-model="durationType"
			@showOptions="showOptions"
		/>
		<component
			v-if="durationOptions != null"
			:is="durationOptions"
		></component>
		<BaseSelect
			:title="'Target'"
			:typeOptions="targetTypes"
			:optionsArray="'targetTypes'"
			v-model="targetType"
			@showOptions="showOptions"
		/>
		<component v-if="targetOptions != null" :is="targetOptions"></component>
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
	import BaseSelect from './BaseSelect.vue';
	import DistanceInput from './inputs/DistanceInput.vue';
	import TimeInput from './inputs/TimeInput.vue';
	import HeartRateInput from './inputs/HeartRateInput.vue';
	import PaceInput from './inputs/PaceInput.vue';
	import CadenceInput from './inputs/CadenceInput.vue';
	import HeartZoneInput from './inputs/HeartZoneInput.vue';
	import PowerZoneInput from './inputs/PowerZoneInput.vue';
	export default {
		name: 'workout-edit',
		props: ['lap'],
		components: {
			BaseSelect,
			DistanceInput,
			TimeInput,
			HeartRateInput,
			PaceInput,
			CadenceInput,
			HeartZoneInput,
			PowerZoneInput,
		},
		data() {
			return {
				test: null,
				lapType: '',
				lapTypes: [
					{ name: 'warmup' },
					{ name: 'coolDown' },
					{ name: 'active' },
					{ name: 'rest' },
				],
				durationType: '',
				durationOptions: null,
				durationTypes: [
					{ name: 'time', option: TimeInput },
					{ name: 'distance', option: DistanceInput },
					{ name: 'lap_button_pressed', option: null },
					{ name: 'heart_rate', option: HeartRateInput },
				],
				targetType: '',
				targetOptions: null,
				targetTypes: [
					{ name: 'No_Target', option: null },
					{ name: 'pace', option: PaceInput },
					{ name: 'cadence', option: CadenceInput },
					{ name: 'heart_rate_zone', option: HeartZoneInput },
					{ name: 'power_zone', option: PowerZoneInput },
				],
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
			showOptions(data) {
				console.log('data', data);
				if (data.options == 'lapTypes') return;
				else if (data.options == 'durationTypes') {
					this.durationOptions = this.durationTypes.find(
						el => el.name === data.name
					).option;
				} else if (data.options == 'targetTypes') {
					this.targetOptions = this.targetTypes.find(
						el => el.name === data.name
					).option;
				}
			},
			// TODO save option data to lap
		},
		created() {
			console.log('sport', this.lap.lapType);
			this.lapType = this.lap.lapType;
			this.durationType = this.lap.durationType;
			this.targetType = this.lap.targetType;
		},
	};
</script>
