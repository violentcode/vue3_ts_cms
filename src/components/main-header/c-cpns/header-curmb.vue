<template>
  <div class="header-curmb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: curmbNames.subMenuUrl }">{{
        curmbNames.subMenu
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ curmbNames.menu }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue"
import { useRoute } from "vue-router"
import { mapPathToName } from "@/utils/map-menus"
import { computed } from "vue"
const route = useRoute()

// 通过当前路径拿到菜单的名称
const curmbNames = computed(() => {
  return mapPathToName(route.path)
})
</script>

<style lang="less" scoped>
.header-curmb {
  color: pink;
}
</style>
