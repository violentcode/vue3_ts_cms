import * as echart from "echarts"
import ChinaMapData from "@/components/page-echart/data/china.json"

// 注册中国地图
echart.registerMap("china", ChinaMapData as any)

export default function useEchart(el: HTMLElement) {
  const echartInstance = echart.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 适配浏览器
  window.addEventListener("resize", () => {
    echartInstance.resize()
  })

  // 外部可以使用echart的resize
  const updataSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updataSize
  }
}
