<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuFold">
      <el-icon size="28px">
        <component :is="isFold ? 'expand' : 'fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-curmb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import headerCurmb from "./c-cpns/header-curmb.vue"
import headerInfo from "./c-cpns/header-info.vue"
import { ref } from "vue"
const emit = defineEmits(["foldChange"])
const isFold = ref(false)
function handleMenuFold() {
  // 1.内部icon发生变化
  isFold.value = !isFold.value
  // 2.传递给父组件事件
  emit("foldChange", isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  .menu-icon {
    padding-right: 20px;
    margin-top: 3px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
