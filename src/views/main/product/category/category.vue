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
