import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Raycast from '../views/Raycast.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Raycast',
    component: Raycast
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
