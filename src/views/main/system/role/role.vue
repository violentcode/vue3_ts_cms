<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @search-click="handleSearchClick"
      @refresh-click="handleRefreshCLick"
    />
    <page-content
      :content-config="contentCofig"
      ref="contentRef"
      @new-user="handleNewUser"
      @edit-user="handleEditUser"
    />
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      :other-info="otherInfo"
    >
      <template #tree>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from "vue"
import type { ElTree } from "element-plus"

import pageSearch from "@/components/page-search/page-search.vue"
import pageContent from "@/components/page-content/page-content.vue"
import pageModal from "@/components/page-modal/page-modal.vue"

import usePageCountent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"

import searchConfig from "./config/search.config"
import contentCofig from "./config/content.config"
import modalConfig from "./config/modal.config"
import useMainStore from "@/store/main/main"
import useSystemStore from "@/store/main/system/system"
import { mapMenuListToCheckKeys } from "@/utils/map-menus"
import { storeToRefs } from "pinia"

const { contentRef, handleSearchClick, handleRefreshCLick } = usePageCountent()

const { modalRef, handleNewUser, handleEditUser } = usePageModal(
  editCallback,
  newCallback
)

// 获取全部菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

// 触发tree复选框的事件
const otherInfo = ref({})
function handleTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 当前选中的keys，为了点击编辑时让tree回显
const systemStore = useSystemStore()
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(id: number) {
  const menuList = systemStore.pageList.filter((item) => item.id === id)[0]
    .menuList
  const checkKeys = mapMenuListToCheckKeys(menuList, [])
  nextTick(() => {
    treeRef.value?.setCheckedKeys(checkKeys)
  })
}

// 点击新建时让tree清空
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
</script>

<style scoped></style>
