<template>
  <el-container>
    <Sider></Sider>

    <el-container class="container" direction="vertical">
      <Header></Header>
      <el-main class="main" v-if="isRouterAlive">
        <keep-alive>
          <router-view class="page-content" v-if="$route.meta && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view class="page-content" v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Header from './Header';
import Sider from './Sider';
import { setLang } from '@/locale/i18n-setup';
import { mapActions } from 'vuex'; //, mapGetters
import menuConfig from '@/config/menuConfig.js';
export default {
  
  components: {
    Header,
    Sider
  },
  
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      contentHeight: 0,
      isRouterAlive: true
    };
  },
  
  beforeCreate() {
    // 没有拿到userData的化就重新设置，再设置语言
    if (!sessionStorage.userData) {
      this.$store.dispatch('GetUserInfo', {}).then(data => { 
        setLang(this.$store.state.user.lang);
      });
    }
  },
  created() {
    this.changeBreadcrumb(this.$route);
  },
  computed: {
    // ...mapGetters(['getCurrentMenuStyle'])
  },
  watch: {
    $route() {
      this.changeBreadcrumb(this.$route);
    }
  },
  methods: {
    ...mapActions(['BREADCRUMB_ITEMS']),
    changeBreadcrumb (route) {
      let oneLevelMenu = {};
      let twoLevelMenu = {};
      menuConfig.forEach(menu => {
        if (menu.children) {
          const item = menu.children.find(item => item.path === route.path);
          if (item) {
            oneLevelMenu = menu;
            twoLevelMenu = item;
            return false;
          }
        } else {
          if (menu.path === route.path) {
            oneLevelMenu = menu;
          }
        }
      });
      this.BREADCRUMB_ITEMS([oneLevelMenu, twoLevelMenu]);
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  
};
</script>

<style lang="scss" scoped>
.page-content{
  position: relative;
  overflow: hidden;
  overflow-y:auto; 
  width: 100%;
  height: 100%;

}
</style>