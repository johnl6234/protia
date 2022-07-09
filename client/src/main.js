import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import FlashView from './plugins/Flash/flashPlugin.js';

import './assets/base.css';

const app = createApp(App);
app.use(FlashView);

app.use(router);
app.use(store);

app.mount('#app');
