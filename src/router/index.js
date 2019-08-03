import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/common/Layout.vue';
// import Index from './views/Index.vue';

Vue.use(Router);

let routes = [{
  path: '/',
  redirect: '/index',
},

{
  path: '/login',
  name: 'Login',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
},

{
  path: '/index',
  component: Layout,
  children: [{
    path: '/index',
    component: () => import('@/views/Index.vue'),
    meta: {
      name: '首页',
    }
  }]
}];

const routerContext = require.context(
  './', 
  true, 
  /index\.js$/
);
routerContext.keys().forEach(route => {
  if (route.startsWith('./index')) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规法
   */
  routes = [...routes, ...Layout(routerModule.default || routerModule)];
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});