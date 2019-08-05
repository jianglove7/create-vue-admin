<template>
  <el-dropdown class="a-user-set" @command="handleCommand">
    <span class="el-dropdown-link">
      <span class="a-user-set__avatar">
        <img :src="userData.avatar">
      </span>
      {{userData.userName}}
    </span>
    <el-dropdown-menu slot="dropdown" size="medium">
      <template v-for="(item,index) in dropdownList">
        <el-dropdown-item :key="index" :divided="item.divided" :command="item.command">
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
        icon: 'user',
        command: 'userCenter'
      },
      {
        name: '个人设置',
        icon: 'setting',
        command: 'userSetting'
      },
      {
        name: '退出登录',
        divided: true,
        icon: 'switch-button',
        command: 'logOut'
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
    handleCommand(data) {
      this[data]();
    },
    userCenter() {
      // TODO 跳到用户中心
    },
    userSetting() {
      // TODO 跳到用户设置
    },
    logOut() {
      // TODO 退出
      this.$store.dispatch('LogOut');
      this.$router.push('/login');
    }

  },
};
</script>

<style scoped lang="scss">
    .a-user-set{
    &__avatar{
      display: inline-block;
      overflow: hidden;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .el-dropdown-link{
      padding: 0 15px;
      line-height: 60px;
    }
  }
  .el-dropdown:hover{
    background-color: #f9f9f9;
  }
</style>