<template>
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
	import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
	import '../../node_modules/vue-simple-calendar/dist/style.css';
	import '../../node_modules/vue-simple-calendar/static/css/default.css';
	import axios from 'axios';
	import ModalQuickView from './modal/ModalQuickView.vue';
	import ModalCreateWorkout from './modal/ModalCreateWorkout.vue';
	export default {
		name: 'calendar-page',
		components: {
			CalendarView,
			CalendarViewHeader,
			ModalQuickView,
			ModalCreateWorkout,
		},
		data: function () {
			return {
				workoutId: null,
				showActivityModal: false,
				showDate: new Date(),
				calendarItems: [],
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
				console.log('date', item);
				this.workoutDate = item;
				this.toggleWorkoutModal();
			},
			toggleWorkoutModal() {
				this.showWorkoutModal = !this.showWorkoutModal;
			},
			async getActivities() {
				await axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/' +
							this.$store.getters.getUserData._id
					)
					.then(res => {
						res.data.activities.forEach(activity => {
							activity.title = activity.session.sport;
							activity.startDate = activity.date;
							activity.id = activity._id;
							activity.classes = [activity.session.sport];
						});
						this.calendarItems.push(...res.data.activities);
						this.$store.commit(
							'setUserActivities',
							res.data.activities
						);
					});
			},
		},
		created() {
			if (this.$store.getters.getUserActivitiesLength < 1)
				this.getActivities();
			else
				this.calendarItems.push(
					...this.$store.getters.getUserActivities
				);
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

	/* .isHovered {
		cursor: pointer;
	} */
</style>
