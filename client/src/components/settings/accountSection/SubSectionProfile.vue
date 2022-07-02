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
						<div class="px-4 py-3 col-span-1">
							<div class="grid grid-cols-3">
								<label
									for="firstAndLast"
									class="block text-gray-700"
									>First and Last Name</label
								>
								<input
									type="text"
									v-model="userData.firstAndLast"
									name="firstAndLast"
									@focusout="stoppedEditing"
									id="firstAndLast"
									autocomplete="given-name"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>

							<div class="grid grid-cols-3 mt-2">
								<label
									for="email-address"
									class="block text-gray-700"
									>Email address</label
								>
								<input
									type="text"
									v-model="userData.email"
									name="email"
									@focusout="stoppedEditing"
									id="email-address"
									autocomplete="email"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>

							<div class="grid grid-cols-3 mt-2">
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
									<option>Cyclist</option>
									<option>Runner</option>
									<option>Swimmer</option>
									<option>Triathlete</option>
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
							<div class="grid grid-cols-3 mt-2">
								<label
									for="username"
									class="block text-gray-700"
									>Username</label
								>
								<p
									class="col-span-2 block w-full py-1 px-3 username"
								>
									{{ userData.username }}
								</p>
							</div>

							<div class="grid grid-cols-3 mt-2">
								<label
									for="password"
									class="block text-gray-700"
									>Password</label
								>
								<input
									type="password"
									v-model="userData.password"
									name="password"
									@focusout="stoppedEditing"
									id="password"
									autocomplete="password"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
							<div class="grid grid-cols-3 mt-2">
								<label
									for="retypePassword"
									class="block text-gray-700"
									>ReType Password</label
								>
								<input
									type="password"
									v-model="userData.reTypePassword"
									name="reTypePassword"
									@focusout="stoppedEditing"
									id="retypePassword"
									autocomplete="password"
									class="col-span-2 mb-10 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
							<!-- Address section -->

							<div class="grid grid-cols-3 mt-2">
								<label
									for="street-address-1"
									class="block text-gray-700"
									>Address</label
								>
								<input
									type="text"
									v-model="userData.addressLine1"
									name="addressLine1"
									@focusout="stoppedEditing"
									id="street-address-1"
									autocomplete="street-address"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
							<div class="grid grid-cols-3 mt-2">
								<label
									for="street-address-2"
									class="block text-gray-700"
								></label>
								<input
									type="text"
									v-model="userData.addressLine2"
									name="addressLine2"
									@focusout="stoppedEditing"
									id="street-address-2"
									autocomplete="street-address"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
							<div class="grid grid-cols-3 mt-2">
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

							<div class="grid grid-cols-3 mt-2">
								<label
									for="postal-code"
									class="block text-gray-700"
									>Postal Code</label
								>
								<input
									type="text"
									v-model="userData.postalCode"
									name="postalCode"
									@focusout="stoppedEditing"
									id="postal-code"
									autocomplete="postal-code"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
							<div class="grid grid-cols-3 mt-2">
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
							<div class="grid grid-cols-3 mt-2">
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
							<div class="grid grid-cols-3 mt-2">
								<label for="phone" class="block text-gray-700"
									>Phone</label
								>
								<input
									type="text"
									v-model="userData.phone"
									name="phone"
									@focusout="stoppedEditing"
									id="phone"
									autocomplete="phone"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
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
	export default {
		name: 'profile-section',
		data() {
			return {
				countries: [
					'Afghanistan',
					'Albania',
					'Algeria',
					'Andorra',
					'Angola',
					'Antigua and Barbuda',
					'Argentina',
					'Armenia',
					'Australia',
					'Austria',
					'Azerbaijan',
					'Bahamas',
					'Bahrain',
					'Bangladesh',
					'Barbados',
					'Belarus',
					'Belgium',
					'Belize',
					'Benin',
					'Bhutan',
					'Bolivia',
					'Bosnia and Herzegovina',
					'Botswana',
					'Brazil',
					'Brunei',
					'Bulgaria',
					'Burkina Faso',
					'Burundi',
					'Cabo Verde',
					'Cambodia',
					'Cameroon',
					'Canada',
					'Central African Republic (CAR)',
					'Chad',
					'Chile',
					'China',
					'Colombia',
					'Comoros',
					'Congo, Democratic Republic of the',
					'Congo, Republic of the',
					'Costa Rica',
					'Cote d Ivoire',
					'Croatia',
					'Cuba',
					'Cyprus',
					'Czechia',
					'Denmark',
					'Djibouti',
					'Dominica',
					'Dominican Republic',
					'Ecuador',
					'Egypt',
					'El Salvador',
					'Equatorial Guinea',
					'Eritrea',
					'Estonia',
					'Eswatini',
					'Ethiopia',
					'Fiji',
					'Finland',
					'France',
					'Gabon',
					'Gambia',
					'Georgia',
					'Germany',
					'Ghana',
					'Greece',
					'Grenada',
					'Guatemala',
					'Guinea',
					'Guinea-Bissau',
					'Guyana',
					'Haiti',
					'Honduras',
					'Hungary',
					'Iceland',
					'India',
					'Indonesia',
					'Iran',
					'Iraq',
					'Ireland',
					'Israel',
					'Italy',
					'Jamaica',
					'Japan',
					'Jordan',
					'Kazakhstan',
					'Kenya',
					'Kiribati',
					'Kosovo',
					'Kuwait',
					'Kyrgyzstan',
					'Laos',
					'Latvia',
					'Lebanon',
					'Lesotho',
					'Liberia',
					'Libya',
					'Liechtenstein',
					'Lithuania',
					'Luxembourg',
					'Madagascar',
					'Malawi',
					'Malaysia',
					'Maldives',
					'Mali',
					'Malta',
					'Marshall Islands',
					'Mauritania',
					'Mauritius',
					'Mexico',
					'Micronesia',
					'Moldova',
					'Monaco',
					'Mongolia',
					'Montenegro',
					'Morocco',
					'Mozambique',
					'Myanmar',
					'Namibia',
					'Nauru',
					'Nepal',
					'Netherlands',
					'New Zealand',
					'Nicaragua',
					'Niger',
					'Nigeria',
					'North Korea',
					'North Macedonia',
					'Norway',
					'Oman',
					'Pakistan',
					'Palau',
					'Palestine',
					'Panama',
					'Papua New Guinea',
					'Paraguay',
					'Peru',
					'Philippines',
					'Poland',
					'Portugal',
					'Qatar',
					'Romania',
					'Russia',
					'Rwanda',
					'Saint Kitts and Nevis',
					'Saint Lucia',
					'Saint Vincent and the Grenadines',
					'Samoa',
					'San Marino',
					'Sao Tome and Principe',
					'Saudi Arabia',
					'Senegal',
					'Serbia',
					'Seychelles',
					'Sierra Leone',
					'Singapore',
					'Slovakia',
					'Slovenia',
					'Solomon Islands',
					'Somalia',
					'South Africa',
					'South Korea',
					'South Sudan',
					'Spain',
					'Sri Lanka',
					'Sudan',
					'Suriname',
					'Sweden',
					'Switzerland',
					'Syria',
					'Taiwan',
					'Tajikistan',
					'Tanzania',
					'Thailand',
					'Timor-Leste',
					'Togo',
					'Tonga',
					'Trinidad and Tobago',
					'Tunisia',
					'Turkey',
					'Turkmenistan',
					'Tuvalu',
					'Uganda',
					'Ukraine',
					'United Arab Emirates (UAE)',
					'United Kingdom (UK)',
					'United States of America (USA)',
					'Uruguay',
					'Uzbekistan',
					'Vanuatu',
					'Vatican City (Holy See)',
					'Venezuela',
					'Vietnam',
					'Yemen',
					'Zambia',
					'Zimbabwe',
				],
				states: [
					'Alabama',
					'Alaska',
					'Arizona',
					'Arkansas',
					'California',
					'Colorado',
					'Connecticut',
					'Delaware',
					'Florida',
					'Georgia',
					'Hawaii',
					'Idaho',
					'Illinois',
					'Indiana',
					'Iowa',
					'Kansas',
					'Kentucky',
					'Louisiana',
					'Maine',
					'Maryland',
					'Massachusetts',
					'Michigan',
					'Minnesota',
					'Mississippi',
					'Missouri',
					'Montana',
					'Nebraska',
					'Nevada',
					'New Hampshire',
					'New Jersey',
					'New Mexico',
					'New York',
					'North Carolina',
					'North Dakota',
					'Ohio',
					'Oklahoma',
					'Oregon',
					'Pennsylvania',
					'Rhode Island',
					'South Carolina',
					'South Dakota',
					'Tennessee',
					'Texas',
					'Utah',
					'Vermont',
					'Virginia',
					'Washington',
					'West Virginia',
					'Wisconsin',
					'Wyoming',
				],
				userData: {
					username: '',
					firstAndLast: '',
					email: '',
					sport: '',
					gender: '',
					password: '',
					reTypePassword: '',
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
			},
			onFileChange(event) {
				this.files = event.target.files;
				event.target.value = null;
			},
			addFiles(files) {
				this.files = files;
			},
		},
		created() {
			//this.username = this.$store.getters.getUsername;
			this.userData = this.$store.getters.getUserData;
		},
		components: { DropZone },
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
