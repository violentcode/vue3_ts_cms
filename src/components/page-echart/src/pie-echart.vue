<template>
  <div class="pie-echart">
    <base-echart :options="props.pieData.length ? options : undefined" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import baseEchart from "./base-echart.vue"

interface IProps {
  pieData: any[]
}
const props = defineProps<IProps>()

const options = computed((): EChartsOption => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "商品分类",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
