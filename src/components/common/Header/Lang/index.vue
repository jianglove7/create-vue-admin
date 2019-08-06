<template>
  <el-dropdown class="a-lang"  @command="handleCommand" size="medium">
    <span class="el-dropdown-link">
      {{$t('header.selectLang')}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <template v-for="(lang,index) in langList">
        <el-dropdown-item :class="index === locale?'active':''" :key="index" :command="index">{{lang}}</el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import { mapGetters } from 'vuex';
import { setLang } from '@/locale/i18n-setup';

const langList = {
  'zh': '中文简体',
  'en': 'English',
  'ja': '日本語'
};
// langCheckList: {
//         'zh': 'zh_CN_',
//         'en': 'en_US_',
//         'ja': 'ja_JP_'
//       },
export default {
  data() {
    return {
      
      langList,
      locale: 'zh',
      langStr: '',
    };
  },
  computed: {
    ...mapGetters(['userData', 'lang']),
  },
 
  components: {
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
        this.$store.dispatch('SetUserData', JSON.parse(sessionStorage.userData));
      } catch (error) {}
    }
  },
  methods: {
    handleCommand(lang) {
      setLang(lang);
    }
  },
};
</script>

<style scoped lang="scss">
.el-dropdown-link{
  display: inline-block;
  padding: 0 10px;
  line-height: 60px;
}
.el-dropdown:hover{
  background-color: #f9f9f9;
}
</style>