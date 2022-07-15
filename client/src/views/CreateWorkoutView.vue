<template>
	<div class="container h-full p-5">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Create Workout
		</h1>
		<div class="mx-20 pt-12 mb-3 grid grid-cols-6 border-b border-zinc-400">
			<div class="col-span-4">
				<div v-if="editTitle" class="flex flex-row">
					<input v-model="editedTitle" />
					<button @click="saveTitle">
						<Check />
					</button>
					<button @click="cancelEditTitle">
						<Close />
					</button>
				</div>
				<div v-else class="flex flex-row">
					<span class="text-lg">{{ workout.title }}</span>
					<span class="ml-5 cursor-pointer" @click="toggleEditTitle"
						><Pencil fillColor="rgb(59 130 246)"
					/></span>
				</div>
			</div>
			<div class="col-span-2 mb-2">
				<button
					class="bg-zinc-300 text-black px-3 py-1 rounded-md mr-3"
				>
					cancel
				</button>
				<button class="bg-blue-500 text-white px-3 py-1 rounded-md">
					Save
				</button>
			</div>
		</div>

		<div class="grid grid-cols-12 pr-5">
			<div
				class="col-span-8"
				@drop="onDrop($event, 1)"
				@dragover.prevent
				@dragenter.prevent
			>
				<div
					v-for="(lap, index) in workout.laps"
					:key="index"
					:title="lap.id"
					:id="lap.id"
					class="top-level"
					@dragover.prevent
					@dragenter.prevent="showDropZone"
				>
					<baseWorkoutCard
						:title="lap.id"
						draggable="true"
						@dragstart="startDrag($event, lap)"
						:lap="lap"
						@deleteLap="deleteLap(lap.id)"
						@editLap="editLap(lap.id, $event)"
					/>
				</div>
			</div>
			<div class="col-span-4">
				<div>
					<button @click.prevent="addLap">Add lap</button>
				</div>
				<div class="flex flex-row mb-2">
					<div class="font-bold mr-3">Duration:</div>
					<div>{{ totalDuration }} minutes</div>
				</div>
				<div class="mb-2">
					<div class="font-bold mr-3">Description:</div>
					<div class="">{{ workout.description }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseWorkoutCard from '../components/workouts/BaseWorkoutCard.vue';
	import { makeId } from '../utils/utils';
	import Pencil from 'vue-material-design-icons/Pencil.vue';
	import Close from 'vue-material-design-icons/Close.vue';
	import Check from 'vue-material-design-icons/Check.vue';

	export default {
		props: ['date'],
		components: { baseWorkoutCard, Pencil, Close, Check },
		data() {
			return {
				editTitle: false,
				editedTitle: 'Test Workout',
				workoutDate: null,
				defaultLap: {
					order: 0,
					lapType: 'active', // [warmup,coolDown,active,rest]
					targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
					target: '2', // target zone
					durationType: 'time', // duration of lap
					duration: '60', // duration of lap
					description: 'Description on Lap',
				},
				workout: {
					_id: makeId(5),
					title: 'New Workout',
					startDate: this.workoutDate,
					classes: ['workout'],
					description: 'Description of Workout',
					laps: [
						{
							id: makeId(5),
							order: 0,
							lapType: 'warmup', // [warmup,coolDown,active,rest]
							targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
							target: '2', // target zone
							durationType: 'time', // duration of lap
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
						{
							id: makeId(5),
							order: 1,
							lapType: 'active', // [warmup,coolDown,active,rest]
							targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
							target: '2', // target zone
							durationType: 'time', // duration of lap
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
						{
							id: makeId(5),
							order: 2,
							lapType: 'coolDown', // [warmup,coolDown,active,rest]
							targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
							target: '2', // target zone
							durationType: 'time', // duration of lap
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
					],
				},
			};
		},
		methods: {
			startDrag(evt, item) {
				evt.dataTransfer.dropEffect = 'move';
				evt.dataTransfer.effectAllowed = 'move';
				evt.dataTransfer.setData('itemID', item.id);
			},
			onDrop(evt) {
				let element = evt.target.parentElement;
				while (element.id == '') {
					element = element.parentElement;
				}
				let droppedId = evt.dataTransfer.getData('itemID');
				const elementId = element.title;
				this.moveInArray(droppedId, elementId);
			},
			moveInArray(movingId, placeId) {
				let laps = this.workout.laps.map(lap => lap);
				let placeLap = laps.find(el => el.id == placeId);
				let toOrder;
				if (placeLap) toOrder = placeLap.order;
				else toOrder = this.workout.laps.length + 1;
				laps.forEach(lap => {
					if (lap.order >= toOrder && lap.id != movingId) lap.order++;
				});

				let droppedChart = laps.find(el => el.id == movingId);
				droppedChart.order = toOrder;
				laps.sort((a, b) => a.order - b.order);
				// adjust order from 0 - length
				laps.forEach((lap, index) => (lap.order = index + 1));
				this.workout.laps = laps;
			},
			addLap() {
				console.log('add lap');
				let newLap = Object.create(this.defaultLap);
				newLap.id = makeId(5);
				newLap.order = this.workout.laps.length + 1;
				this.workout.laps.push(newLap);
			},
			deleteLap(lapId) {
				let newLaps = this.workout.laps.filter(lap => lap.id !== lapId);
				this.workout.laps = newLaps;
			},
			editLap(lapId, event) {
				let lap = this.workout.laps.find(lap => lap.id == lapId);
				lap.lapType = event.lapType;
				lap.durationType = event.durationType;
				lap.targetType = event.targetType;
				console.log('edit', lapId, event);
			},
			toggleEditTitle() {
				this.editTitle = !this.editTitle;
			},
			saveTitle() {
				this.workout.title = this.editedTitle;
				this.toggleEditTitle();
			},
			cancelEditTitle() {
				this.editedTitle = this.workout.title;
				this.toggleEditTitle();
			},
		},
		computed: {
			totalDuration() {
				let totalTime = 0;
				this.workout.laps.forEach(lap => {
					totalTime += Number(lap.duration);
				});
				return totalTime;
			},
		},
		created() {
			if (this.date) this.workoutDate = this.date;
			else this.workoutDate = new Date();
			console.log('date', this.workoutDate);
			console.log('params', this.$route.params.type);
		},
	};
</script>
