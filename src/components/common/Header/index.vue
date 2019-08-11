<template>
  <el-header class="header">

    <div>
      <base-icon class-name="menu-fold" icon-class="menu-fold" @click="handleMenuFold"></base-icon>
    </div>
    <div class="breadcrumb">
      <transition-group tag="el-breadcrumb" separator-class="el-icon-arrow-right" name="fade-move">
        <template v-for="(item,index) in getBreadcrumbItems">
          <el-breadcrumb-item v-if="item.name" :key="index">{{ $t(`menu.${item.name}`) }}</el-breadcrumb-item>
        </template>
        
      </transition-group>
    </div>

    <div  class="header-right">
       <Lang></Lang>
      <UserSet></UserSet>
    </div>
  </el-header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['getMenuCollapse', 'getBreadcrumbItems'])
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
    ...mapActions(['MENU_COLLAPSE']),
    handleMenuFold () {
      this.MENU_COLLAPSE(!this.getMenuCollapse);
    },
  },
};
</script>

<style scoped lang="scss">
$headerHeight: 65px;
.header {
  width: 100%;
  height: $headerHeight;
  line-height: $headerHeight;
  padding: 0 35px;
  background: #fff;
  @include boxShadow;
  @include flex(row);
  justify-content:flex-start;
  align-items: center;

  .menu-fold {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  .base-icon{
      margin-right: 20px;
    }

  .breadcrumb{
    flex: 1;
  }
  .header-right{
    float:right;
    height: 100%;
    overflow: hidden;
    @include flex(row);
    flex-wrap: nowrap;
  }
}
</style>