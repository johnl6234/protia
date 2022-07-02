import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CalendarView from '../views/CalendarView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProgressView from '../views/ProgressView.vue';
import AuthView from '../views/AuthView.vue';
import SettingsView from '../views/SettingsView.vue';
import UploadView from '../views/UploadView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/calendar',
			name: 'calendar',
			component: CalendarView,
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView,
		},
		{
			path: '/progress',
			name: 'progress',
			component: ProgressView,
		},
		{
			path: '/auth',
			name: 'auth',
			component: AuthView,
		},
		{
			path: '/settings',
			name: 'settings',
			component: SettingsView,
		},
		{
			path: '/upload',
			name: 'upload',
			component: UploadView,
		},
	],
});

export default router;
