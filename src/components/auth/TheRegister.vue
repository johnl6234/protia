<template>
	<div
		class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
	>
		<div class="form-container">
			<div class="max-w-md w-full space-y-8">
				<div>
					<h2
						class="mt-6 text-center text-3xl font-extrabold text-gray-900"
					>
						Register for an Account
					</h2>
				</div>
				<form class="mt-8 space-y-6">
					<input type="hidden" name="remember" value="true" />
					<div class="rounded-md shadow-sm -space-y-px">
						<div>
							<label for="name" class="sr-only"
								>First And Last</label
							>
							<input
								id="name"
								v-model="username"
								type="text"
								autocomplete="name"
								required="true"
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
								placeholder="First and Last Name"
							/>
						</div>
						<div>
							<label for="email-address" class="sr-only"
								>Email address</label
							>
							<input
								id="email-address"
								v-model="email"
								type="email"
								autocomplete="email"
								required="true"
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label for="password" class="sr-only"
								>Password</label
							>
							<input
								id="password"
								v-model="password"
								type="password"
								autocomplete="current-password"
								required="true"
								class="appearance-none rounded-md mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
						<div>
							<label for="password-confirm" class="sr-only"
								>Password</label
							>
							<input
								id="password-confirm"
								v-model="passwordConfirm"
								type="password"
								autocomplete="current-password"
								required="true"
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>
					<div class="flex items-center">
						<p>
							Already have an account?
							<span
								class="cursor-pointer"
								@click="$emit('switchScreen', 'the-login')"
								>Login here.</span
							>
						</p>
					</div>

					<div>
						<button
							@click.prevent="submitRegister"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span
								class="absolute left-0 inset-y-0 flex items-center pl-3"
							>
							</span>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				username: '',
				email: '',
				password: '',
				passwordConfirm: '',
			};
		},
		methods: {
			submitRegister() {
				if (
					this.username === '' ||
					this.email === '' ||
					this.password === '' ||
					this.passwordConfirm === '' ||
					!this.passwordsMatch ||
					this.ValidateEmail(this.email.trim()) === null
				) {
					console.log('empty inputs');
				} else {
					this.RegisterUser();
				}
			},
			ValidateEmail(email) {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			},
			RegisterUser() {
				const data = {
					username: this.username,
					email: this.email.trim().toLowerCase(),
					password: this.password,
				};
				axios
					.post(import.meta.env.VITE_SERVER_URI + 'register', data)
					.then(res => {
						if (res.data.success) {
							//this.$store.commit('login', res.data);
							this.$router.push({ path: '/' });
						} else {
							this.errorMsg = res.data.error;
						}
					});
			},
		},
		computed: {
			passwordsMatch() {
				return this.password === this.passwordConfirm;
			},
		},
	};
</script>

<style scoped>
	.form-container {
		padding: 20px;
		background-color: white;
		border-radius: 20px;
	}
</style>
