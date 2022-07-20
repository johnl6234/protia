<template>
	<select name="date-ranges" @change="changeDateRange">
		<option
			v-for="(range, index) in dateRangeList"
			:key="index"
			:value="range.range"
		>
			{{ range.name }}
		</option>
	</select>
</template>

<script>
	import store from '../../store';
	export default {
		name: 'date-range',
		emits: ['getData'],
		data() {
			return {
				dateRange: null,
				dateRangeList: [
					{
						name: 'Last 7 days',
						range: {
							beforeToday: 7,
							afterToday: 0,
						},
					},
					{
						name: 'Last 14 days',
						range: {
							beforeToday: 14,
							afterToday: 0,
						},
					},
					{
						name: 'Last 128 days',
						range: {
							beforeToday: 128,
							afterToday: 0,
						},
					},
				],
			};
		},
		methods: {
			changeDateRange(e) {
				store.commit(
					'setDateRange',
					this.dateRangeList[e.target.selectedIndex]
				);
				this.$emit('getData');
			},
		},
	};
</script>
