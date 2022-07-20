<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="relative z-10" @close="closeModal">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				/>
			</TransitionChild>

			<div class="fixed z-10 inset-0 overflow-y-auto">
				<div
					class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
				>
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<DialogPanel
							class="workout-container relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8"
						>
							<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div>
									<MapBox
										v-if="
											startPos !== null &&
											workout !== null &&
											workout.route.length > 0
										"
										:workout="workout"
										:startPos="startPos"
										:mapPoint="mapPoint"
									/>
									<h1 v-else>No Map</h1>
								</div>
								<div>
									<WorkoutStatsCycling
										v-if="workout !== null"
										:workout="workout"
									/>
								</div>
							</div>
							<!-- Buttons container -->
							<div
								class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
							>
								<button
									type="button"
									class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
									@click="closeModal"
								>
									Close
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script>
	import {
		Dialog,
		DialogPanel,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import MapBox from '../mapbox/MapBox.vue';
	const WorkoutStatsCycling = () => import('./WorkoutStatsCycling.vue');
	import axios from 'axios';
	export default {
		props: {
			open: Boolean,
			workoutId: String,
		},
		components: {
			Dialog,
			DialogPanel,
			TransitionChild,
			TransitionRoot,
			MapBox,
			WorkoutStatsCycling,
		},
		data() {
			return {
				startPos: null,
				workout: null,
				mapPoint: 0,
			};
		},
		methods: {
			closeModal() {
				this.startPos = null;
				this.workout = null;
				this.$emit('toggleModal');
			},
			async fetchWorkout() {
				await axios
					.get(
						import.meta.env.VITE_SERVER_URI +
							'activities/activity/' +
							this.workoutId
					)
					.then(res => {
						this.workout = res.data;
						this.startPos = [
							res.data.session.start_position_long / 11930465,
							res.data.session.start_position_lat / 11930465,
						];
						this.smoothPower();
					});
			},
			smoothPower() {
				let data = this.workout.power.filter(point => {
					if (point != 'undefined' && Number(point) < 2000)
						return point;
				});
				this.workout.power = data;
			},
		},
		watch: {
			workoutId() {
				if (this.workoutId !== null) this.fetchWorkout();
			},
			'$store.state.mapPoint': function () {
				this.mapPoint = this.$store.getters.getMapPoint;
			},
		},
		created() {
			if (this.workoutId !== null) this.fetchWorkout();
		},
	};
</script>

<style scoped>
	.workout-container {
		width: 80%;
	}
</style>
