<template>
  <div class="rose-echart">
    <base-echart :options="props.roseData.length ? options : undefined" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import baseEchart from "./base-echart.vue"

interface IProp {
  roseData: any[]
}
const props = defineProps<IProp>()
const options = computed((): EChartsOption => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [10, 160],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.rose-echart {
  color: pink;
}
</style>
