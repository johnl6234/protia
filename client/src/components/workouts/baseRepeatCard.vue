<template>
	<div
		class="mb-3 max-w-sm bg-white rounded-lg shadow-md mx-auto cursor-pointer"
	>
		<!-- Repeat header -->
		<div
			class="px-4 py-1 text-black rounded-lg grid grid-cols-3 justify-between"
		>
			<div>Repeat</div>
			<div class="grid grid-cols-2">
				<input
					class="text-right rounded-l-md border-r-0 border border-slate-500 p-1 block shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					v-model="repeatTimes"
					type="number"
				/>
				<span
					class="rounded-r-md border border-slate-500 bg-slate-300 p-1 block shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					Times
				</span>
			</div>
			<!-- Delete repeat button -->
			<div class="text-black flex justify-end">
				<button @click="addLapToArray">Add Step</button>
				<DeleteOutline @click.prevent="$emit('deleteLap')" />
			</div>
		</div>
		<div class="p-3">
			<baseWorkoutCard
				v-for="(interval, index) in step.steps"
				:key="interval.id"
				:step="interval"
				:openCard="openCardId === interval.id"
				@editLap="editLap(interval.id, $event)"
				@deleteLap="deleteLap(interval.id)"
				@closeOtherCards="closeOtherCards"
			/>
		</div>
	</div>
</template>
<!-- 
				
				
				 -->
<script>
	import baseWorkoutCard from './baseWorkoutCard.vue';
	import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
	import { addElement } from '../../utils/utils';
	export default {
		name: 'repeat-card',
		props: ['step'],
		components: { baseWorkoutCard, DeleteOutline },
		data() {
			return {
				openCardId: null,
				repeatTimes: 2,
			};
		},
		methods: {
			editLap(lapId, event) {
				let lap = this.step.steps.find(lap => lap.id == lapId);
				lap.lapType = event.lapType;
				lap.durationType = event.durationType;
				lap.targetType = event.targetType;
				console.log('edit', lapId, event);
			},
			addLapToArray() {
				this.step.steps = addElement(this.step.steps, this.defaultLap);
			},
			deleteLap(lapId) {
				let newLaps = this.step.steps.filter(lap => lap.id !== lapId);
				this.step.steps = newLaps;
			},
			closeOtherCards(cardId) {
				console.log('id', cardId);
				this.openCardId = cardId;
			},
		},
		computed: {
			defaultLap() {
				return this.$store.getters.getDefaultLap;
			},
		},
	};
</script>
