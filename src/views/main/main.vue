<template>
  <div class="main">
    <el-container>
      <el-aside :width="asideChange ? '60px' : '210px'">
        <main-menu :isFlod="asideChange" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from "@/components/main-menu/main-menu.vue"
import mainHeader from "@/components/main-header/main-header.vue"
import { ref } from "vue"
const asideChange = ref(false)
// 菜单栏折叠事件
function handleFoldChange(isFlod: boolean) {
  asideChange.value = isFlod
}
</script>

<style lang="less" scoped>
.main {
  color: black;
  height: 100%;
  .el-container {
    height: 100%;

    .el-aside {
      overflow: hidden;
      transition: width 0.5s ease;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
