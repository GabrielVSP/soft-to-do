import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    beforeEnter: (to, from, next) => {

      if(!localStorage.getItem('accessToken')) {
        next({ name: 'login' });
        return
      }

      next()

    }
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

export default routes;
