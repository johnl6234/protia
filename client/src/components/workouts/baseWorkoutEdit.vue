<template>
	<div class="p-5">
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
		<component v-if="targetOptions" :is="targetOptions"></component>
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
	export default {
		name: 'workout-edit',
		props: ['lap'],
		components: { BaseSelect, DistanceInput, TimeInput, HeartRateInput },
		data() {
			return {
				test: null,
				durationOptions: null,
				targetOptions: null,
				lapType: '',
				lapTypes: [
					{ name: 'warmup' },
					{ name: 'coolDown' },
					{ name: 'active' },
					{ name: 'rest' },
				],
				durationType: '',
				durationTypes: [
					{ name: 'time', option: TimeInput },
					{ name: 'distance', option: DistanceInput },
					{ name: 'lap_button_pressed', option: null },
					{ name: 'heart rate', option: HeartRateInput },
				],
				targetType: '',
				targetTypes: [
					{ name: 'pace', option: DistanceInput },
					{ name: 'cadence', option: DistanceInput },
					{ name: 'heart_rate_zone', option: DistanceInput },
					{ name: 'power', option: DistanceInput },
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
					console.log('duration', data.options);
				} else if (data.options == 'durationTypes') {
					this.targetOptions = this.targetTypes.find(
						el => el.name === data.name
					).option;
					console.log('target', data.options);
				}
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
