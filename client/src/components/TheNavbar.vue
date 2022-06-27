<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex-shrink-0 flex items-center">
                        <router-link :to="{ name: 'home' }"><img class="block  h-8 w-auto" src="src\assets\images\nav_logo.png" /></router-link>
                    </div>
                    <div class="hidden sm:block sm:ml-6 self-center">
                        <div class="flex space-x-4 mx-auto">
                            <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.to }" class="block px-3 py-2 rounded-md text-base font-medium text-gray-500	"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button"
                        class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Profile dropdown -->
                    <Menu v-if="this.$store.getters.isLoggedIn" as="div" class="ml-3 relative">
                        <div>
                            <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                <router-link :to="{ name: 'settings' }" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</router-link>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <div @click.prevent="LogOut" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</div>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                    <router-link :to="{ name: 'auth' }" v-else type="button"
                        class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">View notifications</span>
                        <LoginIcon class="h-6 w-6" aria-hidden="true" />
                    </router-link>

                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 mx-auto">
                <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.to }" class="block px-3 py-2 rounded-md text-base font-medium text-gray-500	"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, LoginIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

</script>

<script>
export default {
    data() {
        return {
            loggedIn: false,
            navigation: [
                { name: 'Home', to: 'home' },
                { name: 'Calendar', to: 'calendar' },
                { name: 'Dashboard', to: 'dashboard' },
                { name: 'ATP', to: 'atp' },
            ]
        }
    },
    methods: {
        LogOut() {
            this.$store.commit('logout')
            console.log('loggedIn', this.$store.getters.isLoggedIn)
        }
    }
}
</script>
<style scoped>
.nav-link:hover,
.router-link-active {
    background-color: rgb(22, 30, 46) !important;
    border-radius: .5em;
    color: white !important;
}

.nav-logo {
    border-radius: .5rem;
    width: 100px;
    height: 35px;
    margin-left: 1rem;
}
</style>