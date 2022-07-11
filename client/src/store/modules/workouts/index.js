import { makeId } from '../../../utils/utils';
export default {
	state() {
		return {
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
	},
	getters: {
		getUserWorkouts(state) {
			return state.userWorkouts;
		},
		getUserWorkoutsLength(state) {
			return state.userWorkouts.length;
		},
	},
	actions: {
		setUserWorkouts(context, payload) {
			context.commit('setUserWorkouts', payload);
		},
	},
};
