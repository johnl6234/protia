<template>
	<div class="grid grid-cols-3 mb-2">
		<label
			:for="name"
			class="block text-gray-700 font-extralight text-xs text-right pr-4"
			>{{ text }}</label
		>
		<input
			:type="type"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:name="name"
			@focusout="$emit('focusout')"
			:id="name"
			:autocomplete="autoComplete"
			class="px-2 col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-extralight text-sm"
		/>
	</div>
</template>
<script>
	export default {
		props: ['modelValue', 'type', 'name', 'autoComplete', 'text'],
	};
</script>
