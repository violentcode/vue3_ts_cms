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
    >
      <!-- 插槽状态标签 -->
      <template #tag="scope">
        <el-table-column align="center" v-bind="scope">
          <template #default="scope1">
            <el-tag type="success">{{
              scope1.row.status ? "可用" : "下架"
            }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <!-- 插槽图片 -->
      <template #img="scope">
        <el-table-column align="center" v-bind="scope">
          <template #default="scope2">
            <el-image
              style="width: 100%"
              :src="scope2.row.imgUrl"
              :preview-src-list="[scope2.row.imgUrl]"
              preview-teleported
            />
          </template>
        </el-table-column>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"> </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
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

const { modalRef, handleNewUser, handleEditUser } = usePageModal()
</script>

<style scoped></style>
