<template>
  <div class="base-echart">
    <div
      ref="echartRef"
      class="echart"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, withDefaults, watchEffect } from "vue"
import type { EChartsOption } from "echarts"
import useEchart from "@/hooks/useEchart"

interface IProps {
  options: EChartsOption
  width?: string
  height?: string
}
const props = withDefaults(defineProps<IProps>(), {
  options: () => ({}),
  width: "100%",
  height: "340px"
})

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped>
.base-echart {
  color: pink;
}
</style>
