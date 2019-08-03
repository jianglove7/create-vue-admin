import axios from 'axios';
import store from '../store';
import {
  Message,
  MessageBox
} from 'element-ui';

function ErrorMsgShow(msg, sec = 5000, type = 'error') {
  Message({
    message: msg,
    type: type,
    duration: sec
  });
}

const loginURL = '#/login';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(response);
    // 接口报错处理
    if (typeof res === 'string') {
      // 处理非json数据格式报错处理，比如二进制流
      return res;
    } else if (res.code !== 200) {
      // 登录验证失败
      if (res.code === 403) {
        let msg = res.msg || res.message;
        MessageBox.alert(msg, '提示', {
          confirmButtonText: '确定',
          callback: () => {
            store.dispatch('LogOut').then(() => {
              let currentUrl = encodeURIComponent(window.location.href);
              if (currentUrl.split('http').length > 1) {
                const _url = currentUrl.split('returnUrl')[0];
                currentUrl = _url;
              }
              window.location.href = `${loginURL}?returnUrl=${currentUrl}`;
              let resMsg = res.msg || res.message;
              if ((window.ActiveXObject || 'ActiveXObject' in window) && resMsg === 'user not login') {
                location.reload();
              }
            });
          }
        });
      } else {
        if (+res.code === 999) {
          ErrorMsgShow(res.msg, 3000, 'warning');
        } else {
          ErrorMsgShow(res.msg);
        }
      }

      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    ErrorMsgShow('网络繁忙， 请稍后再试');
    return Promise.reject(error);
  }
);

export default service;