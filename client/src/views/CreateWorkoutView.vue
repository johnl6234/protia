<template>
	<div class="container h-full p-5">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Create Workout
		</h1>
		<div class="flex flex-row pt-12 pr-5">
			<div class="w-4/6">
				<WorkoutEdit />
				<baseWorkoutCard
					v-for="(lap, index) in workout.laps"
					:key="index"
					:lap="lap"
				/>
			</div>
			<div class="w-2/6 border border-red-600">
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
	import baseWorkoutCard from '../components/workouts/baseWorkoutCard.vue';
	import WorkoutEdit from '../components/workouts/baseWorkoutEdit.vue';
	import { makeId } from '../utils/utils';
	export default {
		props: ['date'],
		components: { baseWorkoutCard, WorkoutEdit },
		data() {
			return {
				workoutDate: null,
				workout: {
					_id: makeId(5),
					title: 'Test Workout',
					startDate: this.workoutDate,
					classes: ['workout'],
					description: 'Description of Workout',
					laps: [
						{
							type: 'warmup', // [warmup,coolDown,active,rest]
							targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
							target: '2', // target zone
							durationType: 'time', // duration of lap
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
						{
							type: 'active', // [warmup,coolDown,active,rest]
							targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
							target: '2', // target zone
							durationType: 'time', // duration of lap
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
						{
							type: 'coolDown', // [warmup,coolDown,active,rest]
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
			console.log('date', this.date);
			console.log('params', this.$route.params.type);
		},
	};
</script>
