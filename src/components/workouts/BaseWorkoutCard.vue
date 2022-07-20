<template>
	<div
		:class="!isOpen ? 'hover:border hover:border-blue-500' : ''"
		class="mb-3 max-w-sm bg-white rounded-lg shadow-md mx-auto cursor-pointer"
	>
		<BaseWorkoutEdit v-if="isOpen" :lap="step" @saveEdits="saveEdits" />
		<div v-else>
			<div
				:class="step.lapType"
				class="px-4 py-1 text-slate-50 rounded-t-lg grid grid-cols-12"
			>
				<div class="col-span-10">
					{{ step.lapType }}
				</div>
				<button @click.prevent="$emit('closeOtherCards', step.id)">
					edit
				</button>
				<button class="text-black flex justify-end">
					<DeleteOutline @click.prevent="$emit('deleteLap')" />
				</button>
			</div>
			<div
				class="flex flex-row justify-evenly p-4"
				@click.prevent="$emit('closeOtherCards', step.id)"
			>
				<div class="px-6 flex-1 flex-col">
					<div class="font-bold">
						{{ step.durationType.split('_').join(' ') }}
					</div>
					<div class="">{{ step.duration }}</div>
				</div>
				<div class="px-6 flex-1 flex-col">
					<div class="font-bold">
						{{ step.targetType.split('_').join(' ') }}
					</div>
					<div class="">{{ step.target }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseWorkoutEdit from './BaseWorkoutEdit.vue';
	import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';

	export default {
		props: ['step', 'openCard'],
		emits: ['closeOtherCards'],
		components: {
			BaseWorkoutEdit,
			DeleteOutline,
		},
		data() {
			return {
				isEditing: false,
			};
		},
		methods: {
			saveEdits(data) {
				this.$emit('closeOtherCards');
				this.$emit('editLap', data);
			},
		},
		computed: {
			isOpen() {
				return this.openCard;
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
	.rest {
		background-color: rgb(86, 86, 87);
	}
	/* div {
		border: 1px solid red;
	} */
</style>
