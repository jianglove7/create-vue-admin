<template>
  <el-header>
    <!-- <div>
      <cc-svg-icon class-name="menu-fold" icon-class="menu-fold" @click="handleMenuFold"></cc-svg-icon>
    </div> -->
    <div>
      <!-- <transition-group tag="el-breadcrumb" separator-class="el-icon-arrow-right" name="fade-move">
        <el-breadcrumb-item v-for="item in getBreadcrumbItems" :key="item.path">{{ $t(item.name) }}</el-breadcrumb-item>
      </transition-group> -->
    </div>
    <div style="text-align: right; line-height:60px;">
       <Lang></Lang>
      <UserSet></UserSet>
    </div>
  </el-header>
</template>

<script>
import Lang from './Lang';
import UserSet from './UserSet';
export default {
  components: {
    Lang,
    UserSet
  },
  data() {
    return {
      langCheckList: {
        'zh': 'zh_CN_',
        'en': 'en_US_',
        'ja': 'ja_JP_'
      },
      langStr: '',
      showSearch: false,
      loginOutHref: '',
      userData: {}
    };
  },
  
  inject: ['reload'],
  mounted() {
    this.locale = this.lang || 'zh';

    if (this.locale === 'zh') {
      this.langStr = '中文';
    } else if (this.locale === 'en') {
      this.langStr = 'English';
    } else {
      this.langStr = '日本语';
    }

    if (!this.userData.id && sessionStorage.userData) {
      try {
        this.$store.dispatch('GetUserInfo', JSON.parse(sessionStorage.userData));
      } catch (error) {}
    }
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
 .el-header{
   width: 100%;
   background-color: #fff;
 }
</style>