<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{userData.userName}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown" size="medium">
      <template v-for="(item,index) in dropdownList">
        <el-dropdown-item :key="index" :divided="item.divided" :command="item">
          <i :class="`el-icon-${item.icon}`"></i>
          {{item.name}}
        </el-dropdown-item>
      </template>

    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {
  mapGetters
} from 'vuex';
export default {
  data() {
    return {
      dropdownList: [{
        name: '个人中心',
        icon: 'user'
      },
      {
        name: '个人设置',
        icon: 'setting'
      },
      {
        name: '退出登录',
        divided: true,
        icon: 'switch-button'
      }
      ]
    };
  },
  computed: {
      
    ...mapGetters(['userData']),
  },

  components: {},
  inject: ['reload'],
  mounted() {

  },
  methods: {
    handleCommand() {

    }
  },
};
</script>

<style scoped lang="scss">
  .el-header {
    width: 100%;
    background-color: #fff;
  }
</style>