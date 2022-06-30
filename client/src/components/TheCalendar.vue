<template>
	<calendar-view
		:show-date="showDate"
		:startingDayOfWeek="1"
		:items="items"
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
		:open="showModal"
		:workoutId="workoutId"
		@toggleModal="toggleModal"
	></modal-quick-view>
</template>
<script>
	import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
	import '../../node_modules/vue-simple-calendar/dist/style.css';
	import '../../node_modules/vue-simple-calendar/static/css/default.css';
	import axios from 'axios';
	import ModalQuickView from './modal/ModalQuickView.vue';

	export default {
		name: 'calendar-page',
		data: function () {
			return {
				workoutId: null,
				showModal: false,
				showDate: new Date(),
				items: [
					{
						id: 1,
						startDate: '2022-06-24',
						endDate: '2022-06-24',
						title: 'test event',
					},
					{
						id: 2,
						startDate: '2022-06-26',
						endDate: '2022-06-28',
						title: 'test event',
					},
				],
			};
		},
		components: {
			CalendarView,
			CalendarViewHeader,
			ModalQuickView,
		},
		methods: {
			toggleModal() {
				this.showModal = !this.showModal;
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
			},
			async getActivities() {
				console.log('userId', this.$store.getters.getUserData._id);
				await axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/' +
							this.$store.getters.getUserData._id
					)
					.then(res => {
						console.log('RES calScreen', res.data.activities[0]);
						res.data.activities.forEach(activity => {
							activity.title = activity.session.sport;
							activity.startDate = activity.date;
							activity.id = activity._id;
							activity.classes = [activity.session.sport];
						});
						this.items = res.data.activities;
					});
			},
		},
		created() {
			this.getActivities();
		},
	};
</script>
<style>
	.cv-wrapper {
		height: 90vh;
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

	.isHovered {
		cursor: pointer;
	}
</style>
