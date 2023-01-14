<template>
  <div class="user-search" v-if="isQuery">
    <!-- 表单部分 -->
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8"
            ><el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="searchForm[item.prop]"
                />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select> </template></el-form-item
          ></el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 按钮部分 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleRefreshClick" ref="from"
        >重置</el-button
      >
      <el-button icon="Search" type="primary" @click="handleSearchClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus"
import { reactive, ref } from "vue"
import usePermissions from "@/hooks/usePermissions"

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const emits = defineEmits(["searchClick", "refreshClick"])

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ""
}
// 双向绑定数据
const searchForm = reactive(initialForm)

// 重置按钮点击事件
const formRef = ref<InstanceType<typeof ElForm>>()
function handleRefreshClick() {
  // 1.将表单清空
  formRef.value?.resetFields()
  // 2.清空后重新发送请求
  emits("refreshClick")
}

// 查询按钮点击事件
function handleSearchClick() {
  console.log(searchForm)
  emits("searchClick", searchForm)
}
</script>

<style lang="less" scoped>
.user-search {
  padding: 20px;
  background-color: #fff;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    padding: 0 50px 10px 0;
    text-align: right;
    .el-button {
      height: 36px;
    }
  }
  :deep(.el-range-input) {
    font-size: 12px;
  }
}
</style>
