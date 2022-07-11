<template>
	<div class="container h-full">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Create Workout
		</h1>
		<div class="w-3/4 mx-auto pt-12">
			<baseWorkoutCard
				v-for="(lap, index) in workout.laps"
				:key="index"
				:lap="lap"
			/>
		</div>
	</div>
</template>

<script>
	import baseWorkoutCard from '../components/workouts/baseWorkoutCard.vue';
	import { makeId } from '../utils/utils';
	export default {
		props: ['date'],
		components: { baseWorkoutCard },
		data() {
			return {
				workout: {
					_id: makeId(5),
					title: 'Test Workout',
					startDate: this.date,
					classes: ['workout'],
					description: 'Description on Workout',
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
		created() {
			console.log('date', this.date);
			console.log('params', this.$route.params.type);
		},
	};
</script>
