<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<div class="flex relative w-full mx-auto p-3 bg-gray-800">
		<!-- Left hand logo -->
		<div class="inset-y-0 left-0 flex items-center">
			<router-link :to="{ name: 'home' }"
				><img class="block h-8 w-auto rounded-md" :src="navLogo"
			/></router-link>
		</div>

		<!-- Right hand links -->
		<div class="absolute inset-y-0 right-3 flex items-center pr-2">
			<router-link
				:to="{ name: 'upload' }"
				class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
			>
				<span class="sr-only">Upload activities</span>
				<TrayArrowUp class="h-6 w-6" aria-hidden="true" />
			</router-link>
			<button
				type="button"
				class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
			>
				<span class="sr-only">View notifications</span>
				<BellOutline class="h-6 w-6" aria-hidden="true" />
			</button>

			<!-- Profile dropdown -->
			<Menu
				v-if="store.getters.isLoggedIn"
				as="div"
				class="ml-3 relative"
			>
				<div>
					<MenuButton class="bg-gray-800 flex text-sm rounded-full">
						<span class="sr-only">Open user menu</span>
						<img
							class="h-8 w-8 rounded-full"
							:src="avatarSrc"
							alt=""
						/>
					</MenuButton>
				</div>
				<transition
					enter-active-class="transition ease-out duration-100"
					enter-from-class="transform opacity-0 scale-95"
					enter-to-class="transform opacity-100 scale-100"
					leave-active-class="transition ease-in duration-75"
					leave-from-class="transform opacity-100 scale-100"
					leave-to-class="transform opacity-0 scale-95"
				>
					<MenuItems
						class="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white"
					>
						<MenuItem v-slot="{ active }">
							<router-link
								:to="{ name: 'settings' }"
								:class="[
									active ? 'bg-gray-100' : '',
									'block px-4 py-2 text-sm text-gray-700',
								]"
								>Settings</router-link
							>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<div
								@click.prevent="LogOut"
								:class="[
									active ? 'bg-gray-100' : '',
									'block px-4 py-2 text-sm text-gray-700',
								]"
							>
								Sign out
							</div>
						</MenuItem>
					</MenuItems>
				</transition>
			</Menu>
			<router-link
				:to="{ name: 'auth' }"
				v-else
				type="button"
				class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
			>
				<span class="sr-only">View notifications</span>
				<LoginIcon class="h-6 w-6" aria-hidden="true" />
			</router-link>
		</div>
	</div>
</template>

<script setup>
	import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
	import TrayArrowUp from 'vue-material-design-icons/TrayArrowUp.vue';
	import BellOutline from 'vue-material-design-icons/BellOutline.vue';
	import LoginIcon from 'vue-material-design-icons/Login.vue';
</script>

<script>
	import store from '../../store';
	import logo from '@/assets/images/navLogo.png';
	import avatar from '@/assets/images/avatar.jpg';
	export default {
		data() {
			return {
				navLogo: logo,
				avatarSrc: avatar,
				loggedIn: false,
			};
		},
		methods: {
			LogOut() {
				store.commit('logout');
			},
		},
	};
</script>
<style scoped>
	.nav-logo {
		border-radius: 0.5rem;
		width: 100px;
		height: 35px;
		margin-left: 1rem;
	}
</style>
