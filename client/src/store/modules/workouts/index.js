import { makeId } from '../../../utils/utils';
import axios from 'axios';
export default {
	state() {
		return {
			defaultWorkout: {
				title: 'New Workout',
				startDate: new Date(),
				classes: ['workout'],
				description: 'Description of Workout',
				laps: [
					{
						order: 0,
						lapType: 'warmup', // [warmup,coolDown,active,rest]
						targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
						target: '2', // target zone
						durationType: 'time', // duration of lap
						duration: '60', // duration of lap
						description: 'Description on Lap',
					},
					{
						order: 1,
						lapType: 'active', // [warmup,coolDown,active,rest]
						targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
						target: '2', // target zone
						durationType: 'time', // duration of lap
						duration: '60', // duration of lap
						description: 'Description on Lap',
					},
					{
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
			defaultLap: {
				order: 0,
				lapType: 'active', // [warmup,coolDown,active,rest]
				targetType: 'heart_rate_zone', // heart rate zone, power zone, cadence, pace
				target: '2', // target zone
				durationType: 'time', // duration of lap
				duration: '60', // duration of lap
				description: 'Description on Lap',
			},
			userWorkouts: [
				{
					_id: makeId(5),
					title: 'Test Workout',
					startDate: '2022-07-05',
					classes: ['workout'],
					description: 'Description on Workout',
					laps: [
						{
							type: 'warmup', // [warmup,coolDown,active,rest]
							target: 'h-120', // h=heart rate, p=power, - value
							duration: '60', // duration of lap
							description: 'Description on Lap',
						},
					],
				},
			],
		};
	},
	mutations: {
		setUserWorkouts(state, data) {
			state.userWorkouts = data;
		},
		addToUserWorkouts(state, data) {
			state.userWorkouts.push(data);
		},
	},
	getters: {
		getUserWorkouts(state) {
			return state.userWorkouts;
		},
		getUserWorkoutsLength(state) {
			return state.userWorkouts.length;
		},
		getDefaultLap(state) {
			return state.defaultLap;
		},
		getDefaultWorkout(state) {
			return state.defaultWorkout;
		},
	},
	actions: {
		setUserWorkouts(context, payload) {
			context.commit('setUserWorkouts', payload);
		},
		async addToUserWorkouts(context, payload) {
			context.commit('addToUserWorkouts', payload);
			axios.post(
				import.meta.env.VITE_SERVER_URI +
					'workouts/' +
					context.getters.getUserId,
				{
					workout: payload,
				}
			);
		},
	},
};
