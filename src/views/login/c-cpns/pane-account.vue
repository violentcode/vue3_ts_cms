<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :model="accountForm"
      :rules="accountRules"
      ref="accountRuleRef"
    >
      <el-form-item label="帐号" prop="uname">
        <el-input v-model="accountForm.uname" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="accountForm.pwd" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, ElForm } from "element-plus"
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import useLoginStore from "@/store/login/login"
import { loaclCache } from "@/utils/cache"

const loginStore = useLoginStore()

const accountForm = reactive({
  uname: loaclCache.getCache("name") ?? "",
  pwd: loaclCache.getCache("password") ?? ""
})

// 拿到account form实例
const accountRuleRef = ref<InstanceType<typeof ElForm>>()

// 定义校验规则
const accountRules = reactive<FormRules>({
  uname: [
    { required: true, message: "请输入用户名" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6~20数字或字母"
    }
  ],
  pwd: [
    { required: true, message: "请输入密码" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "必须是3位以上数字或字母组成",
      trigger: "change"
    }
  ]
})

function accountLogin(isRemPwd: boolean) {
  accountRuleRef.value?.validate((valid, fields) => {
    // 校验规则验证通过逻辑
    if (valid) {
      const { uname, pwd } = accountForm

      // 发送登录请求
      loginStore
        .accountLoginAction({ name: uname, password: pwd })
        .then((res) => {
          if (isRemPwd) {
            // 记住密码逻辑
            loaclCache.setCache("name", uname)
            loaclCache.setCache("password", pwd)
          } else {
            // 不记住密码逻辑
            loaclCache.removeCache("name")
            loaclCache.removeCache("password")
          }
        })
    } else {
      // 校验未通过逻辑
      console.log("验证失败，还想着提交呢？")
      ElMessage.error("请根据规则输入用户名和密码")
    }
  })
}

defineExpose({ accountLogin })
</script>

<style lang="less" scoped>
.pane-account {
  color: pink;
}
</style>
