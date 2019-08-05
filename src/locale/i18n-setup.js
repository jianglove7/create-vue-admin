import Cookies from 'js-cookie';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import CONFIG from '../config';
import en from './en';
import zh from './zh';
import ja from './ja';
const messages = {
  en,
  zh,
  ja
};
let DEFAULT_LANG = Cookies.get(CONFIG.COOKIE_LANG) || 'zh'; // 默认使用中文
if (DEFAULT_LANG === 'undefined') DEFAULT_LANG = 'zh'; // 对语言判断做增强
Vue.use(VueI18n);

export function getCurrentLang() {
  return Cookies.get(CONFIG.COOKIE_LANG) || 'zh';
}

export const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages
});

const loadedLangs = [];

loadLangAsync(DEFAULT_LANG); // 设置完语言，继续

function setI18nLang(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  Cookies.set(CONFIG.COOKIE_LANG, lang);
  return lang;
}

export function setLang(lang) {
  if (i18n.locale !== lang) {
    Cookies.set(CONFIG.COOKIE_LANG, lang);
    
    // 不是登陆页，刷新页面
    const _href = window.location.href;
    if (_href.indexOf('login') < 0) {
      window.location.reload();
    }
  }
}

export function loadLangAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLangs.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `./${lang}`).then(
        msgs => {
          i18n.setLocaleMessage(lang, msgs.default);
          loadedLangs.push(lang);
          return setI18nLang(lang);
        }
      );
    }
    return Promise.resolve(setI18nLang(lang));
  }
  return Promise.resolve(lang);
}
