<template>
	<div class="flex justify-center items-center h-screen flex-col">
		<div class="p-10 w-5/6">
			// TODO fix manually select files
			<DropZone
				class="upload-div mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
				@files-dropped="addFiles"
				#default="{ dropZoneActive }"
			>
				<label for="file-input">
					<span v-if="dropZoneActive">
						<span>Drop Them Here </span>
						<span class="smaller">to add them</span>
					</span>
					<span v-else>
						<span>Drag Your Files Here</span>
						<span class="smaller">
							or <strong><em>click here</em></strong> to select
							files
						</span>
					</span>

					<input
						type="file"
						id="file-input"
						multiple
						@change="onFileChange"
					/>
				</label>
			</DropZone>
			<div class="px-4 py-3 text-right sm:px-6">
				<button
					:disabled="files === null"
					@click.prevent="handleUpload"
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Upload
				</button>
			</div>
		</div>

		<div v-if="files">
			<div v-for="file in files" :key="file">
				<p>File Name: {{ file.name }}</p>
				<p>Last Modified: {{ file.lastModifiedDate.toDateString() }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import DropZone from '../components/upload/DropZone.vue';
	export default {
		name: 'upload-screen',
		components: { DropZone },
		data() {
			return {
				files: null,
				fileData: null,
			};
		},
		methods: {
			onFileChange(event) {
				this.files = event.target.files;
				event.target.value = null;
			},
			addFiles(files) {
				this.files = files;
			},
			handleUpload() {
				const formData = new FormData();

				// Update the formData object
				for (let file of this.files) {
					formData.append('file', file);
				}
				// Send formData object
				axios
					.post(
						import.meta.env.VITE_SERVER_URI +
							'upload/' +
							this.$store.getters.getUserData._id,
						formData
					)
					.then(res => {
						// TODO redirect if uploaded successfully
						console.log('res', res);
					});
			},
		},
	};
</script>

<style scoped>
	.upload-div {
		align-items: center;
		height: 200px;
		background-color: white;
	}
	button:disabled {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
