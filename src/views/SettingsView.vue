<template>
	<div class="flex flex-row bg-zinc-200 settings pl-3 mt-3">
		<!-- Side navigation -->
		<div class="flex flex-col w-fit border-r border-zinc-400 nav-section">
			<ul class="p-0">
				<!-- Display section nav -->
				<li
					v-for="(link, index) in sectionsArray"
					:key="index"
					:class="[
						displayLink === link.name
							? 'bg-zinc-300 rounded-tl-lg rounded-bl-lg'
							: '',
						'cursor-pointer p-3 pr-0 pb-1 text-xs',
					]"
				>
					<div
						:class="[
							displayLink === link.name ? 'font-bold' : '',
							'pb-1 text-xs',
						]"
						@click.prevent="displaySection(index)"
					>
						{{ link.name }}
					</div>
					<!-- If section active display subLinks -->
					<ul v-if="displayLink === link.name">
						<li
							v-for="section in link.subLinks"
							@click.prevent="gotoSubLink(section)"
							:class="[
								currentSubSection === section
									? ' text-blue-500 font-light'
									: '',
								'pb-1 pl-4 text-xs',
							]"
						>
							{{ section }}
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- Main container -->
		<div class="flex flex-col w-full mr-3">
			<FlashMessage />
			<div class="component-container p-3 bg-zinc-300 mb-12">
				<!-- Display selected section -->
				<component
					v-if="currentSubSection"
					:is="currentSection"
					:toSubSection="currentSubSection"
				/>
			</div>
			<!-- Save Settings Button -->
			<div
				class="px-4 py-3 bg-gray-50 text-right sm:px-6 absolute bottom-0 left-0 w-full"
			>
				<button
					@click="saveData"
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { markRaw } from 'vue';
	import SectionAccountVue from '../components/settings/accountSection/SectionAccount.vue';
	import SectionZonesVue from '../components/settings/zonesSection/SectionZones.vue';
	import FlashMessage from '../plugins/Flash/FlashTemplate.vue';
	const SectionAccount = markRaw(SectionAccountVue);
	const SectionZones = markRaw(SectionZonesVue);
	import store from '../store';
	export default {
		name: 'user-settings',
		components: {
			FlashMessage,
			SectionAccount,
			SectionZones,
		},
		data() {
			return {
				sectionsArray: [
					{
						name: 'Account',
						subLinks: [
							'Profile',
							'Settings',
							'Email Options',
							'Calendar',
						],
						component: SectionAccount,
					},
					{
						name: 'Zones',
						subLinks: ['Heart Rate', 'Power', 'Speed/Pace'],
						component: SectionZones,
					},
				],
				displayLink: null,
				currentSection: null,
				currentSubSection: null,
				UserData: {},
				message: '',
			};
		},
		methods: {
			displaySection(sectionIndex) {
				let section = this.sectionsArray[sectionIndex];
				this.displayLink = section.name;
				this.currentSection = section.component;
				this.currentSubSection = section.subLinks[0];
			},
			gotoSubLink(subLink) {
				this.currentSubSection = subLink;
			},
			saveData() {
				let data = store.getters.getTempData;
				data.zones = store.getters.getZones;
				data.maxHr = store.getters.getMaxHr;
				data.ltThreshold = store.getters.getLtThreshold;
				let userId = store.getters.getUserData._id;

				axios
					.post(
						import.meta.env.VITE_SERVER_URI + 'user/' + userId,
						data
					)
					.then(response => {
						if (response.data.modifiedCount > 0) {
							store.commit('setUserData', data);
							store.commit('setHasUnsavedChanges', false);
							this.message = 'Data Saved Successfully';
							this.$flash({
								type: 'success',
								title: 'Success',
								message: 'Data Saved Successfully',
							});
						} else {
							this.$flash({
								type: 'error',
								title: 'Error',
								message: 'Data Failed To Save',
							});
						}
					});
			},
		},
		mounted() {
			// initialize to first sub section of first section
			this.displayLink = this.sectionsArray[0].name;
			this.currentSection = this.sectionsArray[0].component;
			this.currentSubSection = this.sectionsArray[0].subLinks[0];
		},
		beforeRouteLeave(to, from, next) {
			if (!store.getters.getHasUnsavedChanges) {
				next();
			} else {
				const userWantsToLeave = confirm(
					'Are you sure, You have unsaved Changes'
				);
				if (userWantsToLeave) {
					store.commit('clearTempData');
				}
				next(userWantsToLeave);
			}
		},
	};
</script>
<style>
	.settings {
		height: 90vh;
	}
	.component-container {
		overflow-x: scroll;
		/* min-width: 900px; */
	}
	.nav-section {
		min-width: 110px;
	}
</style>
