import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 
{
  i18n,
  setLang
} from '@/locale/i18n-setup';
import '@/assets/icons';

import 'element-ui/lib/theme-chalk/index.css';

import './components';

import '@/assets/styles/normalize.css';
import '@/assets/styles/style.scss';

// 注册全局过滤器
import filters from './filters';
for (let filter in Object.keys(filters)) {
  Vue.filter(filter, filters[filter]);
}

// 没登陆跳到登陆页面
router.beforeEach((to, from, next) => {
  // 切换路由，要先关闭loading
  store.dispatch('InitUserInfo').then(() => {
    // 设置用户信息语言
    if (store.state.user.lang) {
      setLang(store.state.user.lang);
    }
    next();
  }).catch(() => {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  });
});

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
