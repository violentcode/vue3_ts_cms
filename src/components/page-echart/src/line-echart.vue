<template>
  <div class="bar-echart">
    <base-echart :options="options" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import baseEchart from ".."
interface IProp {
  xlabel: string[]
  value: any[]
}
const props = defineProps<IProp>()
const options = computed((): EChartsOption => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xlabel
    },
    yAxis: {
      type: "value"
    },
    tooltip: {
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    series: [
      {
        data: props.value,
        type: "line",
        areaStyle: {}
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
