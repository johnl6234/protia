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
						Sign in to your account
					</h2>
				</div>
				<form class="mt-8 space-y-6">
					<input type="hidden" name="remember" value="true" />
					<div class="rounded-md shadow-sm -space-y-px">
						<div>
							<label for="username" class="sr-only"
								>Username</label
							>
							<input
								id="username"
								v-model="username"
								type="text"
								autocomplete="username"
								required="true"
								class="appearance-none rounded-md mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Username"
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
								class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>
					<p class="error-msg" v-if="message !== ''">{{ message }}</p>
					<div class="flex items-center">
						<p>
							Dont have an account?
							<span
								class="cursor-pointer"
								@click="$emit('switchScreen', 'the-register')"
								>Register here.</span
							>
						</p>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<input
								id="remember-me"
								v-model="remember"
								type="checkbox"
								class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								for="remember-me"
								class="ml-2 block text-sm text-gray-900"
							>
								Remember me
							</label>
						</div>
						<div class="text-sm">
							<a
								href="#"
								class="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Forgot your password?
							</a>
						</div>
					</div>
					<div>
						<button
							@click.prevent="submitLogin"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span
								class="absolute left-0 inset-y-0 flex items-center pl-3"
							>
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '../../store';
	export default {
		data() {
			return {
				username: '',
				password: '',
				remember: false,
				message: '',
			};
		},
		methods: {
			submitLogin() {
				if (this.username === '' || this.password === '') {
					console.log('empty inputs');
				} else {
					this.LoginUser();
				}
			},
			LoginUser() {
				let data = {
					username: this.username,
					password: this.password,
				};
				store.dispatch('login', data);
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
