<template>
  <div class="menu">
    <page-content :content-config="contentCofig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from "@/components/page-content/page-content.vue"

import contentCofig from "./config/content.config"
</script>

<style scoped></style>
