<template>
  <div class="user-search" v-if="isQuery">
    <!-- 表单部分 -->
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-form-item label="部门名称" prop="name">
            <el-input
              placeholder="请输入查询的部门名称"
              v-model="searchForm.name"
            /> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="部门领导" prop="realname">
            <el-input
              placeholder="请输入查询的领导名称"
              v-model="searchForm.leader"
            /> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            /> </el-form-item
        ></el-col>
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
import usePermissions from "@/hooks/usePermissions"
import type { ElForm } from "element-plus"
import { reactive, ref } from "vue"
const emits = defineEmits(["searchClick", "refreshClick"])
// 双向绑定数据
const searchForm = reactive({
  name: "",
  leader: "",
  createAt: ""
})

// 重置按钮点击事件
const formRef = ref<InstanceType<typeof ElForm>>()
const isQuery = usePermissions(`department:query`)
function handleRefreshClick() {
  // 1.将表单清空
  formRef.value?.resetFields()
  // 2.清空后重新发送请求
  emits("refreshClick")
}

// 查询按钮点击事件
function handleSearchClick() {
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
