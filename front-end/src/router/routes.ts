import { useAuth } from 'src/hooks/useAuth';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const auth = useAuth()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if(!sessionStorage.getItem('accessToken')) {
        next('/login');
      }
        next() }
    
  },
  {
    path: '/tasks',
    name: 'tasks',
    children: [{ path: '', component: () => import('pages/Tasks/TasksPage.vue') }],
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if(!sessionStorage.getItem('accessToken')) {
        next('/login');
      } 
        next() }
    
  },
  {
    path: '/tasks/:id',
    name: 'task',
    children: [{ path: '', component: () => import('pages/Tasks/SingleTaskPage.vue') }],
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if(!sessionStorage.getItem('accessToken')) {
        next('/login');
      } 
        next() }
    
  },
  {
    path: '/login',
    name: 'login',
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/register',
    name: 'register',
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default routes;
