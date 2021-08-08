import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "./assets/style/var.css";
import './assets/style/common.css';

createApp(App).use(router).mount('#app')
