<template>
	<BaseOverlay :loading="loading" />
	<calendar-view
		:show-date="showDate"
		:startingDayOfWeek="1"
		:items="calendarItems"
		@click-item="eventClicked"
		@click-date="dateClicked"
		class="theme-default"
	>
		<template #header="{ headerProps }">
			<calendar-view-header
				:header-props="headerProps"
				@input="setShowDate"
			/>
		</template>
	</calendar-view>

	<modal-quick-view
		:open="showActivityModal"
		:workoutId="workoutId"
		@toggleModal="toggleModal"
	></modal-quick-view>

	<modal-create-workout
		v-if="showWorkoutModal"
		:date="workoutDate"
		@toggle="toggleWorkoutModal"
	></modal-create-workout>
</template>
<script>
	import store from '../store';
	import { defineAsyncComponent } from 'vue';

	import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
	import '../../node_modules/vue-simple-calendar/dist/style.css';
	import '../../node_modules/vue-simple-calendar/static/css/default.css';
	const ModalQuickView = defineAsyncComponent(() =>
		import('../components/modal/ModalQuickView.vue')
	);
	const ModalCreateWorkout = defineAsyncComponent(() =>
		import('../components/modal/ModalCreateWorkout.vue')
	);
	const BaseOverlay = defineAsyncComponent(() =>
		import('../components/base/BaseOverlay.vue')
	);
	export default {
		name: 'calendar-page',
		components: {
			CalendarView,
			CalendarViewHeader,
			ModalQuickView,
			ModalCreateWorkout,
			BaseOverlay,
		},
		data: function () {
			return {
				loading: false,
				workoutId: null,
				showActivityModal: false,
				showDate: new Date(),
				activities: [],
				showWorkoutModal: false,
				workoutDate: null,
				workouts: [],
			};
		},

		methods: {
			toggleModal() {
				this.showActivityModal = !this.showActivityModal;
			},
			setShowDate(d) {
				this.showDate = d;
			},
			eventClicked(item) {
				this.workoutId = item.id;
				this.toggleModal();
			},
			dateClicked(item) {
				this.workoutDate = item;
				this.toggleWorkoutModal();
			},
			toggleWorkoutModal() {
				this.showWorkoutModal = !this.showWorkoutModal;
			},
		},
		computed: {
			calendarItems() {
				return [
					...store.getters.getUserActivities,
					...store.getters.getUserWorkouts,
				];
			},
		},
		async created() {
			if (store.getters.getUserActivitiesLength < 1) {
				this.loading = true;
				await store.dispatch('getActivities');
				await store.dispatch('getUserWorkouts');
				this.loading = false;
			}
		},
	};
</script>
<style>
	.cv-wrapper {
		height: 90vh;
	}

	.cv-day:hover {
		cursor: pointer;
	}
	.walking {
		background-color: orange !important;
		color: white;
	}

	.cycling {
		background-color: green !important;
		color: white;
	}

	.running {
		background-color: red !important;
		color: white;
	}

	.swimming {
		background-color: blue !important;
		color: white;
	}
	.workout {
		background-color: rgb(143, 177, 188) !important;
		color: white;
	}
</style>
