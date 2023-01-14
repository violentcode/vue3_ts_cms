<template>
  <div class="user">
    <user-search
      @search-click="handleSearchClick"
      @refresh-click="handleRefreshCLick"
    />
    <user-content
      ref="contentRef"
      @new-user="handleNewUser"
      @edit-user="handleEditUser"
    />
    <!-- 模态框 -->
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from "./c-cpns/user-search.vue"
import userContent from "./c-cpns/user-content.vue"
import userModal from "./c-cpns/user-modal.vue"

import { ref } from "vue"

// 1.查询
// 获取user-conten组件
const contentRef = ref<InstanceType<typeof userContent>>()
function handleSearchClick(searchForm: any) {
  contentRef.value?.fetchUserListData(searchForm)
}
// 2.重置
function handleRefreshCLick() {
  contentRef.value?.fetchUserListData()
}
// 3.新建
// 获取user-modal组件
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewUser(callBack: any) {
  modalRef.value?.getModalFromByNew(callBack)
}
// 4.编辑
function handleEditUser(id: number) {
  modalRef.value?.getModalFromByEdit(id)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
