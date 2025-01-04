import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'tasks',
    children: [{ path: '', component: () => import('pages/TasksPage.vue') }],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
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

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth && !localStorage.getItem('accessToken')) {
    next({ name: 'login' });
    return
  }

  next()

})

export default routes;
