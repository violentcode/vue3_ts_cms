import type pageModal from "@/components/page-modal/page-modal.vue"
import { ref } from "vue"

export default function usePageModal(editCallback?: any, newCallback?: any) {
  // 3.新建
  // 获取user-modal组件
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewUser(callBack: any) {
    modalRef.value?.getModalFromByNew(callBack)
    if (newCallback) newCallback()
  }
  // 4.编辑
  function handleEditUser(id: number) {
    modalRef.value?.getModalFromByEdit(id)
    if (editCallback) editCallback(id)
  }
  return {
    modalRef,
    handleNewUser,
    handleEditUser
  }
}
