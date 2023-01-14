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
        <el-form-item label="用户名" prop="name">
          <el-input v-model="modalForm.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="modalForm.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            v-model="modalForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input
            v-model="modalForm.cellphone"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="modalForm.roleId" placeholder="请选择角色">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="modalForm.departmentId" placeholder="请选择部门">
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

// 声明表单变量
const modalForm: any = reactive({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
})

// 声明点击的编辑是第几个
const userId = ref(-1)

// 如果是点击编辑，就用用户的数据
function getModalFromByEdit(id: number) {
  isEdit.value = true
  dialogVisible.value = true
  userId.value = id
  const currentUserItem: any = systemStore.userList.filter(
    (item) => item.id === id
  )[0]
  for (const key in modalForm) {
    modalForm[key] = currentUserItem[key]
  }
}

// 用户保存点击确认页面跳转到第一页
let currentPageFn: any

// 如果是点击创建，就清空数据
function getModalFromByNew(callBack: any) {
  isEdit.value = false
  dialogVisible.value = true
  currentPageFn = callBack
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
    systemStore.postNewUserDataAction(modalForm)
    currentPageFn()
  } else {
    // 更新
    systemStore.patchEmitUserDataAction(userId.value, modalForm)
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
