<template>
  <el-container class="main">
    <Sider></Sider>

    <el-container>
      <Header></Header>
      <el-main v-if="isRouterAlive">
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
export default {

  data() {
    return {
      contentHeight: 0,
      isRouterAlive: true
    };
  },
  
  components: {
    Header,
    Sider
  },
  provide() {
    return {
      reload: this.reload
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
  
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  },
  
};
</script>

<style lang="scss" scoped>
</style>