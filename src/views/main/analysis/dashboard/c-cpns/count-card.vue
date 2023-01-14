<template>
  <div class="count-card">
    <div class="header">
      <div class="title">{{ data.title }}</div>
      <div class="tips">
        <el-tooltip :content="data.tips" placement="top">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
    </div>

    <div class="big-count" ref="refCount1">
      {{ data.number1 }}
    </div>
    <div class="footer">
      <div class="subtitle">{{ data.subtitle }}</div>
      <div class="small-title" ref="refCount2">
        {{ data.number2 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from "countup.js"
import { ref, onMounted } from "vue"

interface IProps {
  data: {
    amount: string
    title: string
    tips: string
    subtitle: string
    number1: number
    number2: number
  }
}
const props = defineProps<IProps>()

// 获取count组件
const refCount1 = ref<HTMLElement>()
const refCount2 = ref<HTMLElement>()

// countup实例的其他配置
const countOptions = {
  prefix: props.data.amount === "saleroom" ? "￥" : ""
}

onMounted(() => {
  const countup1 = new CountUp(
    refCount1.value!,
    props.data.number1,
    countOptions
  )
  const countup2 = new CountUp(
    refCount2.value!,
    props.data.number2,
    countOptions
  )
  // 执行动画
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px 10px;
  height: 100px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #8c8c8c;
  }
  .big-count {
    font-size: 26px;
  }
  .footer {
    display: flex;
    font-size: 14px;
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
