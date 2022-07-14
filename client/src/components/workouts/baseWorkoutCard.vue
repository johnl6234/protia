<template>
	<div
		class="mb-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-auto"
	>
		<BaseWorkoutEdit v-if="isEditing" :lap="lap" @saveEdits="saveEdits" />
		<div v-else>
			<div
				:class="lap.lapType"
				class="px-4 py-1 text-slate-50 rounded-t-lg"
			>
				{{ lap.lapType }}
				<span class="float-right text-black"
					><button @click.prevent="$emit('deleteLap')">
						X
					</button></span
				>
				<span class="float-right mr-3 text-blue-300"
					><button @click.prevent="toggleEditing">edit</button></span
				>
			</div>
			<div class="flex flex-row justify-evenly p-4">
				<div class="px-6 flex-1 flex-col">
					<div class="font-bold">
						{{ lap.durationType.split('_').join(' ') }}
					</div>
					<div class="">{{ lap.duration }}</div>
				</div>
				<div class="px-6 flex-1 flex-col">
					<div class="font-bold">
						{{ lap.targetType.split('_').join(' ') }}
					</div>
					<div class="">{{ lap.target }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseWorkoutEdit from './baseWorkoutEdit.vue';
	export default {
		name: 'workout-card',
		props: ['lap'],
		components: { BaseWorkoutEdit },
		data() {
			return {
				isEditing: false,
			};
		},
		methods: {
			toggleEditing() {
				this.isEditing = !this.isEditing;
			},
			saveEdits(data) {
				this.toggleEditing();
				console.log('data', data);
				this.$emit('editLap', data);
			},
		},
	};
</script>
<style scoped>
	.warmup {
		background-color: red;
	}
	.active {
		background-color: green;
	}
	.coolDown {
		background-color: dodgerblue;
	}
	/* div {
		border: 1px solid red;
	} */
</style>
