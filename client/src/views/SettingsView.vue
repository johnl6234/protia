<template>
	<div class="flex flex-row bg-zinc-200 settings pl-3 mt-3">
		<div class="flex flex-col w-fit border-r border-zinc-400">
			<ul class="p-0">
				<li
					v-for="link in links"
					:key="link.name"
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
						@click="displayOptions(link.name)"
					>
						{{ link.name }}
					</div>
					<ul v-if="displayLink === link.name">
						<li
							@click="gotoSubLink(section)"
							v-for="section in link.subLinks"
							:class="[
								currentSubLink === section
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
		<div class="component-container">
			<!-- Display different sections -->
			<component
				class="p-3 component bg-zinc-300"
				v-if="currentSubLink"
				:is="currentSection"
				:currentSubLink="currentSubLink"
			/>
		</div>
	</div>
</template>

<script>
	import { shallowRef } from 'vue';
	import SectionAccountVue from '../components/settings/accountSection/SectionAccount.vue';
	import SectionZonesVue from '../components/settings/zonesSection/SectionZones.vue';
	const SectionAccount = shallowRef(SectionAccountVue);
	const SectionZones = shallowRef(SectionZonesVue);

	export default {
		name: 'user-settings',
		components: {
			SectionAccount,
			SectionZones,
		},
		data() {
			return {
				links: [
					{
						name: 'Account',
						subLinks: [
							'Profile',
							'Settings',
							'Email Options',
							'Calendar',
						],
					},
					{
						name: 'Zones',
						subLinks: ['Heart Rate', 'Power', 'Speed/Pace'],
					},
				],
				displayLink: 'Account', // default page
				sections: {
					Account: SectionAccount,
					Zones: SectionZones,
				},
				currentSection: SectionAccount,
				currentSubLink: null,
			};
		},
		methods: {
			displayOptions(link) {
				this.displayLink = link;
				this.currentSection = this.sections[link];
			},
			gotoSubLink(subLink) {
				console.log('settings', subLink);
				this.currentSubLink = subLink;
			},
		},
		mounted() {
			this.currentSubLink =
				this.links[
					this.links.findIndex(el => el.name == this.displayLink)
				].subLinks[0]; // default first subLink in section
			console.log('settings sub', this.currentSubLink);
		},
	};
</script>
<style>
	.settings {
		height: 90vh;
	}
	.component {
		min-width: 900px;
	}
	.component-container {
		overflow-x: scroll;
	}
</style>
