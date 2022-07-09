<template>
	<div class="mb-5 w-900">
		<h1 class="border-b text-blue-500 text-xl font-light border-zinc-400">
			Profile
		</h1>

		<div class="mt-5 sm:mt-0">
			<h2 class="m-0 font-bold">Personal Information</h2>
			<div class="mt-1 md:mt-0 md:col-span-2">
				<form>
					<div class="grid grid-cols-2">
						<div class="px-0 py-3 col-span-1">
							<BaseTextInput
								:type="'text'"
								v-model="userData.firstAndLast"
								:name="'firstAndLast'"
								:autocomplete="'name'"
								:text="'First and Last Name'"
								@focusout="stoppedEditing"
							/>

							<BaseTextInput
								:type="'email'"
								v-model="userData.email"
								:name="'email-address'"
								:autocomplete="'email'"
								:text="'Email address'"
								@focusout="stoppedEditing"
							/>

							<div class="grid grid-cols-3 mb-2">
								<label for="sport" class="block text-gray-700"
									>Athlete Type</label
								>
								<select
									id="sport"
									v-model="userData.sport"
									name="sport"
									@change="stoppedEditing"
									autocomplete="sport"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option
										v-for="sport in sports"
										:key="sport"
									>
										{{ sport }}
									</option>
								</select>
								<select
									id="gender"
									v-model="userData.gender"
									name="gender"
									@change="stoppedEditing"
									autocomplete="gender"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option>Gender</option>
									<option>Male</option>
									<option>Female</option>
								</select>
							</div>
							<div class="grid grid-cols-3 mb-2">
								<label
									for="username"
									class="block text-gray-700"
									>Username</label
								>
								<p
									class="col-span-2 block w-full p-0 font-bold text-sm"
								>
									{{ userData.username }}
								</p>
							</div>

							<BaseTextInput
								:type="'password'"
								v-model="userData.password"
								:name="'password'"
								:autocomplete="'new-password'"
								:text="'Password'"
								@focusout="stoppedEditing"
							/>
							<BaseTextInput
								:type="'password'"
								v-model="userData.reTypePassword"
								:name="'reTypePassword'"
								:autocomplete="'new-password'"
								:text="'ReType Password'"
								@focusout="stoppedEditing"
							/>
							<!-- Address section -->

							<BaseTextInput
								:type="'text'"
								v-model="userData.addressLine1"
								:name="'addressLine1'"
								:autocomplete="'street-address'"
								:text="'Address'"
								@focusout="stoppedEditing"
							/>
							<BaseTextInput
								:type="'text'"
								v-model="userData.addressLine2"
								:name="'addressLine2'"
								:autocomplete="'street-address'"
								:text="''"
								@focusout="stoppedEditing"
							/>

							<div class="grid grid-cols-3 mb-2">
								<label for="city" class="block text-gray-700"
									>City</label
								>
								<input
									type="text"
									v-model="userData.city"
									name="city"
									@focusout="stoppedEditing"
									id="city"
									autocomplete="address-level2"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
								<select
									id="state"
									v-model="userData.state"
									name="state"
									@change="stoppedEditing"
									autocomplete="state"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option disabled value="">State</option>
									<option
										v-for="state in states"
										:key="state"
										:value="state"
									>
										{{ state }}
									</option>
								</select>
							</div>

							<BaseTextInput
								:type="'postalCode'"
								v-model="userData.postalCode"
								:name="'postalCode'"
								:autocomplete="'postal-code'"
								:text="'Postal Code'"
								@focusout="stoppedEditing"
							/>

							<div class="grid grid-cols-3 mb-2">
								<label for="country" class="block text-gray-700"
									>Country</label
								>
								<select
									id="country"
									v-model="userData.country"
									name="country"
									@change="stoppedEditing"
									autocomplete="country-name"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option disabled value="">Country</option>
									<option
										v-for="country in countries"
										:key="country"
										:value="country"
									>
										{{ country }}
									</option>
								</select>
							</div>
							<div class="grid grid-cols-3 mb-2">
								<label for="region" class="block text-gray-700"
									>Time Zone</label
								>
								<select
									id="time-zone"
									v-model="userData.timeZone"
									name="timeZone"
									@change="stoppedEditing"
									autocomplete="time-zone"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option>GB (GMT - 01)</option>
									<option>GB (GMT)</option>
									<option>GB (GMT + 01)</option>
								</select>
							</div>
							<BaseTextInput
								:type="'phone'"
								v-model="userData.phone"
								:name="'phone'"
								:autocomplete="'phone'"
								:text="'Phone'"
								@focusout="stoppedEditing"
							/>
						</div>

						<div class="p-10 w-5/6">
							// TODO fix manually select files
							<DropZone
								class="upload-div bg-white mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
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
											or
											<strong><em>click here</em></strong>
											to select files
										</span>
									</span>

									<input
										class="file-input"
										type="file"
										id="file-input"
										multiple
										@change="onFileChange"
									/>
								</label>
							</DropZone>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import DropZone from '../../upload/DropZone.vue';
	import BaseTextInput from '../../base/inputs/BaseTextInput.vue';
	export default {
		name: 'profile-section',
		components: {
			DropZone,
			BaseTextInput,
		},
		data() {
			return {
				userData: {
					username: '',
					firstAndLast: '',
					email: '',
					sport: '',
					gender: '',
					password: '// TODO change',
					reTypePassword: '// TODO change',
					addressLine1: '',
					addressLine2: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
					timeZone: '',
					phone: '',
				},
				files: null,
			};
		},
		methods: {
			stoppedEditing() {
				this.$store.commit('setTempData', this.userData);
				this.$store.commit('setHasUnsavedChanges', true);
			},
			onFileChange(event) {
				this.files = event.target.files;
				event.target.value = null;
			},
			addFiles(files) {
				this.files = files;
			},
		},
		computed: {
			countries() {
				return this.$store.getters.getCountries;
			},
			states() {
				return this.$store.getters.getStates;
			},
			sports() {
				return this.$store.getters.getSports;
			},
		},
		created() {
			this.userData = this.$store.getters.getUserData;
		},
	};
</script>

<style scoped>
	label {
		text-align: right;
		padding-right: 1rem;
		column-span: 1;
		font-weight: 200;
		font-size: smaller;
		vertical-align: center;
	}

	select,
	input {
		font-weight: 200;
		font-size: smaller;
		padding: 2px 4px;
		border: 1px solid #c0b8c9;
	}
	.username {
		font-weight: bold;
		font-size: smaller;
		padding: 2px 4px;
	}
	.upload-div {
		align-items: center;
		height: 400px;
	}
	.file-input {
		border: 0 !important;
	}
</style>
