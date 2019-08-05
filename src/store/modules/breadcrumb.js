import api from '@/api';
const getReallyPath = function (route) {
  let path = '';
  let parent = route.matched[route.matched.length - 2];
  if (parent.meta.type === 'tab') {
    let matchedPath = route.matched[route.matched.length - 2].path;
    let pathLength = matchedPath.split('/').length;
    path = route.path.split('/').slice(0, pathLength).join('/');
  } else {
    path = route.path;
  }
  if (path.substr(path.length - 1, 1) === '/') {
    path = path.slice(0, path.length - 1);
  }
  return path;
};
export default {
  state: {
    breadRecord: [],
    pathHistory: []
  },
  getters: {
    breadRecord: state => state.breadRecord,
    pathHistory: state => state.pathHistory
  },
  actions: {
    // 初始化面包屑，获取session中的记录
    initBreadCrumb({
      dispatch,
      commit,
      state
    }) {
      if (
        sessionStorage.getItem('breadRecord') !== 'null' &&
        sessionStorage.getItem('breadRecord')
      ) {
        let states = JSON.parse(sessionStorage.getItem('breadRecord'));
        commit('SET_RECORD', states);
      }
      if (
        sessionStorage.getItem('pathHistory') !== 'null' &&
        sessionStorage.getItem('pathHistory')
      ) {
        let history = JSON.parse(sessionStorage.getItem('pathHistory'));
        commit('SET_HISTORY', history);
      }
    },
    // 记录
    recordBreadCrumb({
      dispatch,
      commit,
      state
    }, data) {
      if (data.name && data.route && data.name !== '' && Object.keys(data.route).length > 0) {
        let states = JSON.parse(JSON.stringify(state.breadRecord));
        let hasState = false;
        let sIndex = 0;
        states.forEach((routeState, index) => {
          if (routeState.name === data.name) {
            hasState = true;
            sIndex = index;
          }
        });
        // 删除当前选择前往地址之后的面包屑导航记录
        if (hasState) {
          states.splice(sIndex + 1, states.length - (sIndex + 1));
        } else {
          let pm = {
            name: data.name,
            entityId: data.route.path
          };
          // 储存浏览记录
          api.project.saveHistory(pm, {
            isFormData: true
          });
          states.push({
            name: data.name,
            path: data.route.path
          });
          // 设置历史记录
          let matchedPath = getReallyPath(data.route);
          if (state.pathHistory.indexOf(matchedPath) === -1) {
            let history = JSON.parse(JSON.stringify(state.pathHistory));
            history.push(matchedPath);
            commit('SET_HISTORY', history);
          }
        }
        commit('SET_RECORD', states);
      }
    },
    // 更新当前一级面包屑记录，适用于使用了tab并且使用路由记录的页面
    updateBreadRecord({
      commit,
      state
    }, data) {
      let states = JSON.parse(JSON.stringify(state.breadRecord));
      if (states[states.length - 1].name === data.name) {
        states[states.length - 1].path = data.route.path;
        commit('SET_RECORD', states);
      }
    },
    // 清空记录
    cleanBreadCrumb({
      dispatch,
      commit,
      state
    }) {
      commit('CLEAN_RECORD');
      commit('CLEAN_HISTORY');
    },
    // 后退操作
    breadCrumbBack({
      dispatch,
      commit,
      state
    }, path) {
      let records = JSON.parse(JSON.stringify(state.breadRecord));
      let backIndex;
      records.forEach((item, index) => {
        if (item.path === path) {
          backIndex = index;
        }
      });
      let deleteLength = records.length - backIndex + 1;
      records.splice(backIndex + 1, deleteLength);
      commit('SET_RECORD', records);
    },
    // 前进操作
    breadCrumbForward({
      dispatch,
      commit,
      state
    }) {},
    // 更新面包屑
    refreshBreadRecord({
      commit,
      state
    }, data) {
      let states = JSON.parse(JSON.stringify(data));
      commit('SET_RECORD', states);
    }
  },
  mutations: {
    SET_RECORD(state, data) {
      state.breadRecord = data;
      sessionStorage.setItem('breadRecord', JSON.stringify(state.breadRecord));
    },
    CLEAN_RECORD(state) {
      state.breadRecord = [];
      sessionStorage.setItem('breadRecord', []);
    },
    SET_HISTORY(state, data) {
      state.pathHistory = data;
      sessionStorage.setItem('pathHistory', JSON.stringify(state.pathHistory));
    },
    CLEAN_HISTORY(state) {
      state.pathHistory = [];
      sessionStorage.setItem('pathHistory', []);
    }
  }
};
