<template>
	<div class="p-5">
		<BaseSelect
			:title="'Details'"
			:typeOptions="lapTypes"
			v-model="lapType"
			@showOptions="showOptions"
		/>
		<BaseSelect
			:title="'Duration'"
			:typeOptions="durationTypes"
			v-model="durationType"
			@showOptions="showOptions"
		/>
		<BaseSelect
			:title="'Target'"
			:typeOptions="targetTypes"
			v-model="targetType"
			@showOptions="showOptions"
		/>

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
	export default {
		name: 'workout-edit',
		props: ['lap'],
		components: { BaseSelect },
		data() {
			return {
				test: null,
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
				console.log('event', e);
			},
		},
		watch: {
			test(val) {
				console.log('test', val);
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
