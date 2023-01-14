<template>
  <div class="user-content">
    <div class="header">
      <h4 class="title">部门列表</h4>
      <El-button type="primary" @click="handleNewUser" v-if="isCreate"
        >新建部门</El-button
      >
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" align="center" width="60" />
        <el-table-column type="index" label="序号" align="center" width="55" />
        <el-table-column prop="name" label="部门名称" align="center" />
        <el-table-column prop="leader" label="领导" align="center" />
        <el-table-column prop="parentId" label="上级部门" align="center" />
        <el-table-column
          prop="createAt"
          label="创建时间"
          width="340"
          align="center"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          align="center"
          width="340"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button
              @click="handleEditUser(scope.row.id)"
              icon="edit"
              type="primary"
              text
              v-if="isUpdate"
              >编辑</el-button
            >
            <el-popconfirm
              title="确认删除?"
              @confirm="handlePageRemove(scope.row.id)"
              width="60"
            >
              <template #reference>
                <el-button icon="Delete" type="danger" text v-if="isDelete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        large="large"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagetotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/store/main/system/system"
import { storeToRefs } from "pinia"
import { formatUTC } from "@/utils/format"
import { ref, computed } from "vue"
import usePermissions from "@/hooks/usePermissions"

const emits = defineEmits(["newUser", "editUser"])

const isCreate = usePermissions(`department:create`)
const isDelete = usePermissions(`department:delete`)
const isUpdate = usePermissions(`department:update`)
const isQuery = usePermissions(`department:query`)

// 获取用户列表
const systemStore = useSystemStore()

const { pageList, pagetotalCount } = storeToRefs(systemStore)

// 绑定分页器的数据
const currentPage = ref(1)
const pageSize = ref(10)

fetchPageListData()

// 页码发送变化事件
function handleCurrentChange() {
  fetchPageListData()
}

// 每页所展示的数量发送变化事件
function handleSizeChange() {
  fetchPageListData()
}

// 请求获取用户信息的函数
function fetchPageListData(queryInfo: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const query = { ...queryInfo, size, offset }
  systemStore.postPageListDataAction("department", query)
}

// 点击确认删除用户数据
function handlePageRemove(id: number) {
  systemStore.deletePageListDataAction("department", id)
}

// 点击编辑用户数据
function handleEditUser(id: number) {
  emits("editUser", id)
}

// 创建新的用户列表
function handleNewUser() {
  emits("newUser")
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 23px 20px 5px 20px;

  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: 22px;
    }
  }
  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
    .el-button {
      padding: 0;
    }
  }
  .footer {
    .el-pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
