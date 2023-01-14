<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" class="img" />
      <span class="title" v-show="!isFlod">后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFlod"
        :collapse-transition="false"
      >
        <template v-for="group in userMenu" :key="group.id">
          <el-sub-menu :index="String(group.id)">
            <template #title>
              <el-icon>
                <component :is="group.icon.slice(8)"></component>
              </el-icon>
              <span>{{ group.name }}</span>
            </template>
            <template v-for="item in group.children" :key="item.id">
              <el-menu-item
                :index="String(item.id)"
                @click="handleRouterPush(item.url)"
                >{{ item.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router"
import useLoginStore from "@/store/login/login"
import { mapPathToMenu } from "@/utils/map-menus"
import { computed } from "vue"
import { useRoute } from "vue-router"
defineProps({
  isFlod: {
    default: false,
    type: Boolean
  }
})
const userMenu = useLoginStore().userMenu

// 点击菜单实现路由跳转
function handleRouterPush(url: string) {
  router.push(url)
}

// 感觉路径匹配正确的菜单
const route = useRoute()
const defaultActive = computed(() => {
  return mapPathToMenu(route.path) + ""
})
</script>

<style lang="less" scoped>
.main-menu {
  color: white;
  background-color: #001529;
  height: 100%;
  .logo {
    padding: 15px;
    display: flex;
    align-items: center;
    font-weight: 700;
    .img {
      margin-left: 5px;
      width: 30px;
    }
    .title {
      margin-left: 5px;
      white-space: nowrap;
    }
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
