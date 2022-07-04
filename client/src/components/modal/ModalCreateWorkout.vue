<template>
	<!-- overlay -->
	<div
		class="flex w-full h-full absolute left-0 top-0 bg-stone-600 opacity-60"
	></div>
	<!-- modal -->
	<div
		class="w-1/2 h-96 bg-slate-200 absolute translate-x-1/2 translate-y-1/2 rounded-lg p-5"
	>
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Create Workout Modal
		</h1>
		<button @click="closeModal" class="absolute top-2 right-2">
			close
		</button>
		<p>{{ date }}</p>
		<button
			class="p-3 rounded-md bg-red-600"
			@click="setWorkoutType('run')"
		>
			Running
		</button>
		<button
			class="p-3 rounded-md bg-green-600"
			@click="setWorkoutType('cycling')"
		>
			Cycling
		</button>
		<button
			class="p-3 rounded-md bg-blue-600"
			@click="setWorkoutType('swim')"
		>
			Swimming
		</button>
	</div>
</template>

<script>
	export default {
		name: 'create-workout',
		props: ['date'],
		emits: ['toggle'],
		data() {
			return {
				workoutType: null,
			};
		},
		methods: {
			closeModal() {
				this.$emit('toggle');
			},
			setWorkoutType(type) {
				this.workoutType = type;
				this.$emit('toggle');
				this.$router.push({
					name: 'createWorkout',
					params: { type: type, date: this.date },
				});
			},
		},
	};
</script>
