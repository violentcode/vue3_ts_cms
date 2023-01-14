<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h2 class="title">后台管理系统</h2>

    <!-- 中间用户信息 -->
    <div class="tab">
      <el-tabs type="border-card" stretch v-model="currentName">
        <!-- 账号登录 -->
        <el-tab-pane label="User" name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录 -->
        <el-tab-pane label="Config" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部 -->
    <div class="control">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      type="primary"
      class="imm-login"
      size="large"
      @click="handleBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import paneAccount from "./pane-account.vue"
import panePhone from "./pane-phone.vue"
import { ref, watch } from "vue"
import { loaclCache } from "@/utils/cache"

const isRemPwd = ref(loaclCache.getCache("isRemPwd") || false)

const currentName = ref("account")

// 获取到account组件
const accountRef = ref<InstanceType<typeof paneAccount>>()

// 监听忘记密码的改变
watch(isRemPwd, (newValue) => {
  loaclCache.setCache("isRemPwd", newValue)
})

// 立即登录点击事件
function handleBtnClick() {
  if (currentName.value === "account") {
    accountRef.value?.accountLogin(isRemPwd.value)
  } else {
    console.log("phone")
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;

  h2 {
    text-align: center;
  }
  .tab {
    margin-top: 20px;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin-left: 5px;
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
  }
  .imm-login {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
