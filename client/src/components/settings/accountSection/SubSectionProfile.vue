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
									v-model="firstAndLast"
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
									v-model="email"
									id="email-address"
									autocomplete="email"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>

							<div class="grid grid-cols-3 mt-2">
								<label
									for="first-name"
									class="block text-gray-700"
									>Athlete Type</label
								>
								<select
									id="sport"
									v-model="sport"
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
									v-model="gender"
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
									{{ username }}
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
									v-model="password"
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
									v-model="reTypePassword"
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
									v-model="addressLine1"
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
									v-model="addressLine2"
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
									v-model="city"
									id="city"
									autocomplete="address-level2"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
								<select
									id="state"
									v-model="state"
									autocomplete="state"
									class="col-span-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option>State</option>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
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
									v-model="postalCode"
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
									v-model="country"
									autocomplete="country-name"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option>United Kingdom</option>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
							<div class="grid grid-cols-3 mt-2">
								<label for="region" class="block text-gray-700"
									>Time Zone</label
								>
								<select
									id="time-zone"
									v-model="timeZone"
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
									v-model="phone"
									id="phone"
									autocomplete="phone"
									class="col-span-2 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>
						<div class="px-4 py-5 sm:p-6 col-span-1">
							<div>
								<label
									class="block text-sm font-medium text-gray-700"
								>
									Cover photo
								</label>
								<div
									class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
								>
									<div class="space-y-1 text-center">
										<svg
											class="mx-auto h-12 w-12 text-gray-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
										<div class="flex text-sm text-gray-600">
											<label
												for="file-upload"
												class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="file-upload"
													type="file"
													class="sr-only"
												/>
											</label>
											<p class="pl-1">or drag and drop</p>
										</div>
										<p class="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
			};
		},
		created() {
			this.username = this.$store.getters.getUsername;
			const userData = this.$store.getters.getUserData;
			this.email = userData.email;
			this.firstAndLast = userData.firstAndLast;
			if (this.sport) this.sport = userData.sport;
			if (this.gender) this.gender = userData.gender;
			if (this.addressLine1) this.addressLine1 = userData.addressLine1;
			if (this.addressLine2) this.addressLine2 = userData.addressLine2;
			if (this.city) this.city = userData.city;
			if (this.postalCode) this.postalCode = userData.postalCode;
			if (this.timeZone) this.timeZone = userData.timeZone;
			if (this.phone) this.phone = userData.phone;
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
</style>
