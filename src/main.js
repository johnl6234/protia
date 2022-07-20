import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import FlashView from './plugins/Flash/flashPlugin.js';

import './assets/base.css';

const app = createApp(App);

app.use(FlashView);
app.use(router);
app.use(store);

app.mount('#app');
