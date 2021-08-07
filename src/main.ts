import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "./assets/var.css";
import './assets/common.css';

createApp(App).use(router).mount('#app')
