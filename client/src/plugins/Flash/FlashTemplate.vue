<template>
	<div id="flash-view-target" class="hide flash">
		<!-- @click="$flash.close()"> -->
		<div id="flash-title"></div>
		<div id="flash-message"></div>
	</div>
</template>

<style>
	#flash-view-target {
		position: absolute;
		width: 60%;
		top: 10;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 1em;
		animation-name: fadeIn;
		animation-duration: 0.5s;
	}
	#flash-title {
		padding: 0.5em;
		color: white;
	}
	#flash-message {
		padding: 0.5em;
		color: white;
	}
	.hide {
		display: none;
		opacity: 0;
	}
	.show {
		display: block;
		z-index: 50;
	}
	.success {
		background-color: #11a60973;
	}
	.success#flash-view-target {
		border: solid #11a609a7 8px;
	}
	.success > #flash-title {
		background-color: #11a609a7;
	}

	.error {
		background-color: #fc000073;
	}
	.error#flash-view-target {
		border: solid #fc0000a7 8px;
	}
	.error > #flash-title {
		background-color: #fc0000a7;
	}

	@keyframes fadeIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
