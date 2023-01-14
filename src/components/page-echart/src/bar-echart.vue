<template>
  <div class="bar-echart">
    <base-echart :options="options" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts"
import { computed } from "vue"
import baseEchart from "./base-echart.vue"
import * as echarts from "echarts"

interface IProp {
  xlabel: string[]
  value: any[]
}
const props = defineProps<IProp>()

const options = computed((): EChartsOption => {
  return {
    title: {
      text: "特性示例：渐变色 阴影 点击缩放",
      subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom"
    },
    xAxis: {
      data: props.xlabel,
      axisLabel: {
        inside: true,
        color: "#fff"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside"
      }
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" }
            ])
          }
        },
        data: props.value
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.bar-echart {
  color: pink;
}
</style>
