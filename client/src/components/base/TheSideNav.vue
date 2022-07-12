<template>
	<div class="bg-gray-800 flex px-3">
		<div class="flex flex-col">
			<button
				class="px-3 py-2 rounded-md text-base font-medium text-white"
				:class="sideBarOpen ? 'ml-auto' : ''"
				@click="toggleSideBar"
			>
				<ArrowCollapseLeft v-if="sideBarOpen" />
				<ArrowExpandRight v-else />
			</button>
			<router-link
				v-for="item in navigation"
				:key="item.name"
				:to="{
					name: item.to,
					params: item.params,
				}"
				class="px-3 py-2 rounded-md text-base font-medium text-gray-500 flex flex-row"
				:aria-current="item.current ? 'page' : undefined"
				><component :is="item.icon" />
				<span v-if="sideBarOpen" class="pl-3">{{
					item.name
				}}</span></router-link
			>
		</div>
	</div>
</template>

<script setup>
	import HomeOutline from 'vue-material-design-icons/HomeOutline.vue';
	import CalendarMonthOutline from 'vue-material-design-icons/CalendarMonthOutline.vue';
	import ViewDashboardOutline from 'vue-material-design-icons/ViewDashboardOutline.vue';
	import ArrowCollapseLeft from 'vue-material-design-icons/ArrowCollapseLeft.vue';
	import ArrowExpandRight from 'vue-material-design-icons/ArrowExpandRight.vue';
	import ChartLine from 'vue-material-design-icons/ChartLine.vue';
	import Dumbell from 'vue-material-design-icons/Dumbbell.vue';
</script>

<script>
	import { markRaw } from 'vue';
	export default {
		name: 'side-nav',
		data() {
			return {
				sideBarOpen: true,
				navigation: [
					{ name: 'Home', to: 'home', icon: markRaw(HomeOutline) },
					{
						name: 'Calendar',
						to: 'calendar',
						icon: markRaw(CalendarMonthOutline),
					},
					{
						name: 'Dashboard',
						to: 'dashboard',
						icon: markRaw(ViewDashboardOutline),
					},
					{
						name: 'Progress',
						to: 'progress',
						icon: markRaw(ChartLine),
					},
					{
						name: 'Create Workout',
						to: 'createWorkout',
						icon: markRaw(Dumbell),
						params: {
							type: 'run',
						},
					},
				],
			};
		},
		methods: {
			toggleSideBar() {
				this.sideBarOpen = !this.sideBarOpen;
			},
			onResize() {
				if (window.innerWidth < 1024) {
					this.sideBarOpen = false;
				} else {
					this.sideBarOpen = true;
				}
			},
		},
		mounted() {
			this.$nextTick(() => {
				window.addEventListener('resize', this.onResize);
			});
			this.onResize();
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.onResize);
		},
	};
</script>

<style scoped>
	.nav-link:hover,
	.router-link-active {
		background-color: rgb(22, 30, 46) !important;
		border-radius: 0.5em;
		color: white !important;
	}
</style>
