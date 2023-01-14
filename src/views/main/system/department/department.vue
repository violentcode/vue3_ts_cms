<template>
  <div class="department">
    <page-search
      @search-click="handleSearchClick"
      @refresh-click="handleRefreshCLick"
    />
    <page-content
      ref="contentRef"
      @edit-user="handleEditUser"
      @new-user="handleNewUser"
    >
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from "./c-cpns/page-search.vue"
import pageContent from "./c-cpns/page-content.vue"
import pageModal from "./c-cpns/page-modal.vue"

import usePageCountent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"

const { contentRef, handleSearchClick, handleRefreshCLick } = usePageCountent()

const { modalRef, handleNewUser, handleEditUser } = usePageModal()
</script>

<style lang="less" scoped></style>
