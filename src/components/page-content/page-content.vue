<template>
  <div class="user-content">
    <div class="header">
      <h4 class="title">{{ contentConfig.header?.title ?? "数据列表" }}</h4>
      <El-button type="primary" @click="handleNewUser" v-if="isCreate">{{
        contentConfig.header?.btnTitle ?? "新建数据"
      }}</El-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" row-key="id">
        <template v-for="item in contentConfig.propsList" :key="item.babel">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
                    <el-button icon="Delete" type="danger" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'slot'">
            <slot v-bind="item" :name="item.slotName"></slot>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
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

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()

const emits = defineEmits(["newUser", "editUser"])

// 获取是否增删查改的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

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
  systemStore.postPageListDataAction(props.contentConfig.pageName, query)
}

// 点击确认删除用户数据
function handlePageRemove(id: number) {
  systemStore.deletePageListDataAction(props.contentConfig.pageName, id)
}

// 点击编辑用户数据
function handleEditUser(id: number) {
  emits("editUser", id)
}

// 创建新的用户列表
function handleNewUser() {
  emits("newUser", () => {
    currentPage.value = 1
  })
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

:deep(.el-table__cell .cell) {
  overflow: hidden; // 溢出隐藏
  white-space: nowrap; // 强制一行
  text-overflow: ellipsis; // 文字溢出显示省略号
}
</style>
