<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新建用户'"
      width="30%"
      align-center
      center
    >
      <!-- 表单部分-->
      <el-form
        label-width="100px"
        :model="modalForm"
        size="large"
        ref="modalRef"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="modalForm.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="modalForm.leader" placeholder="请输入部门领导" />
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select v-model="modalForm.parentId" placeholder="请选择部门">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system"
import useMainStore from "@/store/main/main"
import type { ElForm } from "element-plus"
import { reactive, ref } from "vue"
import { storeToRefs } from "pinia"

const systemStore = useSystemStore()

// 控制模态框的显示与隐藏变量
const dialogVisible = ref(false)

// 判断是点击的是新建还是编辑
const isEdit = ref()

// 双向绑定表单的数据
// interface IModalForm {
//   name: string
//   parentId: string | number
//   leader: string
// }
// 声明表单变量
const modalForm: any = reactive({
  name: "",
  parentId: "",
  leader: ""
})

// 声明点击的编辑是第几个
const userId = ref(-1)

// 如果是点击编辑，就用用户的数据
function getModalFromByEdit(id: number) {
  isEdit.value = true
  dialogVisible.value = true
  userId.value = id
  const currentPageItem = systemStore.pageList.filter(
    (item) => item.id === id
  )[0]
  for (const key in modalForm) {
    modalForm[key] = currentPageItem[key]
  }
}

// 如果是点击创建，就清空数据
function getModalFromByNew() {
  isEdit.value = false
  dialogVisible.value = true
  for (const key in modalForm) {
    modalForm[key] = ""
  }
}

// 获取角色和部门下拉的数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 点击确认按钮
const modalRef = ref<InstanceType<typeof ElForm>>()
function handleConfirmClick() {
  if (!isEdit.value) {
    // 创建
    systemStore.postNewPageDataAction("department", modalForm)
  } else {
    // 更新
    systemStore.patchEmitPageDataAction("department", userId.value, modalForm)
  }

  // 创建后将模态框关闭
  dialogVisible.value = false
}

// 将事件暴露出去
defineExpose({ getModalFromByEdit, getModalFromByNew })
</script>

<style lang="less" scoped>
.user-modal {
  .el-input,
  .el-select {
    width: 243px;
  }
}
</style>
