<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isEdit ? modalConfig.header.editTitle : modalConfig.header.newTitle
      "
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
        <template v-for="item in modalConfig.formItems" :key="item.prop"
          ><el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                :placeholder="item.placeholder"
                v-model="modalForm[item.prop]"
              />
            </template>
            <template v-else-if="item.type === 'date-picker'">
              <el-date-picker
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="modalForm[item.prop]"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="modalForm[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
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

interface IProps {
  otherInfo?: any
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()

const systemStore = useSystemStore()

// 控制模态框的显示与隐藏变量
const dialogVisible = ref(false)

// 判断是点击的是新建还是编辑
const isEdit = ref()

// 双向绑定表单的数据
// 声明表单变量
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = ""
}
const modalForm: any = reactive(initialData)

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
  const { otherInfo } = props
  let newModalForm = modalForm
  if (otherInfo) {
    newModalForm = { ...modalForm, ...otherInfo }
  }
  if (!isEdit.value) {
    // 创建
    systemStore.postNewPageDataAction(props.modalConfig.pageName, newModalForm)
    currentPageFn()
  } else {
    // 更新
    systemStore.patchEmitPageDataAction(
      props.modalConfig.pageName,
      userId.value,
      newModalForm
    )
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
