<template>
	<div class="p-3 w-full">
		<!-- TODO   -->
		<ProgressChart v-if="datesArray !== null" :datesArray="datesArray" />
		<div class="table-view"></div>
	</div>
</template>

<script>
	import ProgressChart from '../components/progress/ProgressChart.vue';
	export default {
		components: { ProgressChart },
		name: 'atp-page',
		data() {
			return {
				datesArray: null,
			};
		},
		methods: {
			getDaysArray(s, e) {
				for (
					var a = [], d = new Date(s);
					d <= new Date(e);
					d.setDate(d.getDate() + 7)
				) {
					a.push(new Date(d).toISOString());
				}
				return a;
			},
		},
		mounted() {
			let table = this.$el.querySelector('.bb-tableview');
			this.$el.querySelector('.table-view').append(table);
		},
		created() {
			this.datesArray = this.getDaysArray(
				new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
				new Date()
			);
		},
	};
</script>
<style scoped>
	.table-view {
		overflow-y: scroll;
		max-height: 54vh;
	}
</style>
