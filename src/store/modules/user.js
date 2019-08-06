import api from '@/api';
import Cookies from 'js-cookie';
import CONFIG from '@/config';
// function getLangFromAuthorization(authorization) { 
//   let _authorization = decodeURIComponent(authorization); 
//   _authorization = _authorization.split('.')[1]; 
//   let info = atob(_authorization); 
//   info = JSON.parse(info); 
//   let sub = info.sub; 
//   let lang = sub.split(',')[1]; 
//   return lang; 
// }

const serviceLangToLocale = {
  'zh_CN_': 'zh',
  'en_US_': 'en',
  'ja_JP_': 'ja'
};

export default {
  state: {
    userData: {},
    lang: ''
  },

  getters: {
    userData: state => state.userData,
    lang: state => state.lang
  },

  actions: {
    // 登录
    Login({
      commit,
      dispatch
    }, params) {
      return api.login.submit(params)
        .then(({
          data
        }) => {
          dispatch('SetUserData', data);
        });
    },
    GetUserInfo({
      commit,
      dispatch
    }, params) {
      // 获取用户基础信息
      return api.login.getUserInfo(params)
        .then(({
          data
        }) => {
          if (data) {
            dispatch('SetUserData', data);
          }
        });
    },
    // 初始化用户信息，从缓存获取内容
    InitUserInfo({
      commit,
      dispatch
    }) {
      const errMsg = 'login';
      return new Promise((resolve, reject) => {
        let data = sessionStorage.userData || Cookies.get('userData');
        // console.log(data);
        // if (!data) {
        //   reject();
        // }
        try {
          data = JSON.parse(data) || {};
          if (Object.keys(data).length > 0) {
            dispatch('SetUserData', data);
            resolve(data);
          } else {
            reject(errMsg);
          }
        } catch (e) {
          reject(e);
        }
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      commit('SET_USER', {});
      sessionStorage.clear();
      Cookies.remove('Authorization');
    },

    // 设置用户信息
    SetUserData({
      commit,
      dispatch
    }, data) {
      Cookies.set('Authorization', data.Authorization);
      dispatch('GetLang', data);
      commit('SET_USER', data);
    },

    // 获取语言状态
    GetLang({
      commit
    }, data) {
      // cookie里有设置语言就不更新
      if (Cookies.get(CONFIG.COOKIE_LANG)) {
        commit('SET_LANG', Cookies.get(CONFIG.COOKIE_LANG));
      } else {
        let lang = data.language;
        commit('SET_LANG', serviceLangToLocale[lang]);
      }
    }
  },

  mutations: {
    SET_USER(state, data) {
      state.userData = data;
      sessionStorage.userData = JSON.stringify(data);
    },
    SET_LANG(state, lang) {
      state.lang = lang;
    }
  }
};