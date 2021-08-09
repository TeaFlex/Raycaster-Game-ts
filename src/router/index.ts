import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Raycast from '../views/Raycast.vue';
import About from '../views/About.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Raycast',
    component: Raycast
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
