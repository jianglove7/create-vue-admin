<template>
  <el-aside class="a-sider" width="200px">

    <el-menu>
      <!--  :default-openeds="['1', '3']" -->
      <template v-for="(item,index) in menuList">
        <el-menu-item v-if="!item.children" :index="'main-'+index" :key="index" @click="goPage(item.path)">
          
          <base-icon :iconClass="item.icon"></base-icon>
          <span slot="title">{{$t(`menu.${item.name}`)}}</span>
        </el-menu-item>

        <el-submenu v-if="item.children" :index="'main-'+index" :key="index">
          <template slot="title" @click="goPage(subItem.path)">
            <base-icon :iconClass="item.icon"></base-icon>
            {{$t(`menu.${item.name}`)}}
          </template>

          <el-menu-item-group v-if="item.children">
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item v-for="(subItem,subIndex) in item.children" :index="`sub-${index}-${subIndex}`"
              :key="`${index}-${subIndex}`" @click="goPage(subItem.path)">
              <base-icon :iconClass="subItem.icon"></base-icon>
              {{$t(`menu.${subItem.name}`)}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>

    </el-menu>

  </el-aside>
</template>
<script>
import menuList from '@/config/menuConfig';
export default {

  data() {
    return {
      menuList
    };
  },
  mounted() {

  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss">
  .a-sider {
    text-align: left;
    background-color: #000;
    min-height: 100vh;
    box-sizing: border-box;

    .el-menu {
      background-color: #000;

      .el-menu-item-group__title {
        color: #fff;
      }

      .el-submenu__title {
        color: #ccc;
      }

      .el-menu-item {
        color: #ccc;
      }

    }
    .base-icon{
      margin-right: 5px;
    }
  }
</style>