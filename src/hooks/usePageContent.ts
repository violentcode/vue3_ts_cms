import type pageContent from "@/components/page-content/page-content.vue"
import { ref } from "vue"

export default function usePageCountent() {
  // 1.查询
  // 获取user-conten组件
  const contentRef = ref<InstanceType<typeof pageContent>>()
  function handleSearchClick(searchForm: any) {
    contentRef.value?.fetchPageListData(searchForm)
  }
  // 2.重置
  function handleRefreshCLick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleSearchClick,
    handleRefreshCLick
  }
}
