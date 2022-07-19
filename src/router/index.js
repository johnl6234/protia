import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '../store';

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
			component: () => import('../views/CalendarView.vue'),
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('../views/DashboardView.vue'),
		},
		{
			path: '/progress',
			name: 'progress',
			component: () => import('../views/ProgressView.vue'),
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('../views/AuthView.vue'),
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('../views/SettingsView.vue'),
		},
		{
			path: '/upload',
			name: 'upload',
			component: () => import('../views/UploadView.vue'),
		},
		{
			path: '/createWorkout/:type',
			name: 'createWorkout',
			component: () => import('../views/CreateWorkoutView.vue'),
			props: true,
		},
	],
});

router.beforeEach((to, from, next) => {
	store.commit('setIsLoading', true);
	next();
});
router.afterEach(() => {
	store.commit('setIsLoading', false);
});

export default router;
