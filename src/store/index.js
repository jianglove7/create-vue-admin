import vue from 'vue';
import vuex from 'vuex';

import user from './modules/user';

const types = {
  BREADCRUMB_ITEMS: 'BREADCRUMB_ITEMS',
  MENU_COLLAPSE: 'MENU_COLLAPSE',
};
vue.use(vuex);
export default new vuex.Store({
  state: {
    [types.MENU_COLLAPSE]: false, 
    [types.BREADCRUMB_ITEMS]: []
  },
  mutations: {
    [types.MENU_COLLAPSE]: (state, res) => {
      state[types.MENU_COLLAPSE] = res;
    },
    [types.BREADCRUMB_ITEMS]: (state, res) => {
      state[types.BREADCRUMB_ITEMS] = res;
    },
  },
  
  actions: {
    [types.MENU_COLLAPSE]: async ({
      commit
    }, state) => {
      return commit(types.MENU_COLLAPSE, state);
    },
    [types.BREADCRUMB_ITEMS]: async ({
      commit
    }, state) => {
      return commit(types.BREADCRUMB_ITEMS, state);
    },
  },
  getters: {
    getMenuCollapse(state) {
      return state[types.MENU_COLLAPSE];
    },
    getBreadcrumbItems(state) {
      return state[types.BREADCRUMB_ITEMS];
    },
  },
  modules: {
    user
  }
});
