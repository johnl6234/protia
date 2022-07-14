<template>
	<h2 class="font-bold">{{ title }}</h2>
	<div class="grid grid-cols-2">
		<label class="text-right mr-5">Type</label>
		<select
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:onchange="$emit('showOptions')"
			class="rounded-md border border-slate-500 p-1 mb-3 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		>
			<option value="" disabled>-- Select an option --</option>
			<option v-for="option in typeOptions" :key="option" :value="option">
				{{ option.split('_').join(' ') }}
			</option>
		</select>
	</div>
</template>
<script>
	export default {
		props: ['modelValue', 'title', 'type', 'typeOptions'],
		emits: ['showOptions'],
	};
</script>
