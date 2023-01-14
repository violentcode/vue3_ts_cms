<template>
  <div class="header-info">
    <div class="icons">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <div class="dropdown-info">
          <el-avatar
            :size="30"
            :src="'https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg'"
          />
          <div class="name">
            {{ loginStore.userInfo.name }}
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from "@/global/constant"
import router from "@/router"
import useLoginStore from "@/store/login/login"
import { loaclCache } from "@/utils/cache"
const loginStore = useLoginStore()

// 点击退出系统
function handleExitClick() {
  loaclCache.removeCache(LOGIN_TOKEN)
  router.push("/login")
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .icons {
    font-size: 20px;
    .el-icon {
      padding: 8px;
      cursor: pointer;
    }
    .el-icon:hover {
      background-color: #f2f2f2;
    }
  }
  .info {
    margin-left: 20px;
    margin-right: 20px;
    .dropdown-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 5px;
      }
    }
    :global(.el-dropdown-menu__item) {
      line-height: 30px;
    }
  }
}
</style>
