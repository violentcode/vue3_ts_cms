<template>
  <div class="dashboard">
    <!-- 顶部卡片 -->
    <div class="top-cards">
      <el-row :gutter="10">
        <template v-for="item in analysisStore.amountList" :key="item">
          <el-col :span="24 / analysisStore.amountList.length">
            <count-card :data="item" />
          </el-col>
        </template>
      </el-row>
    </div>
  </div>

  <div class="echarts">
    <!-- Echarts部分 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card title="分类商品数量(饼图)">
          <pie-echart :pie-data="pieData" />
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card title="不同城市商品销量">
          <map-echart :map-data="mapData" />
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="roseData" />
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <my-card title="分类商品的销量">
          <line-echart :xlabel="categoryLabels" :value="categoryValues" />
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="分类商品的收藏">
          <bar-echart :xlabel="favorLabels" :value="favorValues" />
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from "@/store/main/analysis/analysis"
import countCard from "./c-cpns/count-card.vue"
import myCard from "@/components/my-card/my-card.vue"
import { computed } from "vue"

import {
  pieEchart,
  roseEchart,
  mapEchart,
  lineEchart,
  barEchart
} from "@/components/page-echart"

// 发送请求
const analysisStore = useAnalysisStore()
analysisStore.getAmountListAction()
analysisStore.getDashboardDataAction()

// 饼图数据
const pieData = computed(() => {
  return analysisStore.categoryGoodsCount.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

// 玫瑰图数据
const roseData = computed(() => {
  return analysisStore.categoryGoodsCount.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

// 面积图
const categoryLabels = computed(() => {
  console.log(analysisStore.categoryGoodsSale.map((item) => item.name))
  return analysisStore.categoryGoodsSale.map((item) => item.name)
})
const categoryValues = computed(() => {
  return analysisStore.categoryGoodsSale.map((item) => item.goodsCount)
})

// 柱状图
const favorLabels = computed(() => {
  return analysisStore.categoryGoodsFavor.map((item) => item.name)
})
const favorValues = computed(() => {
  return analysisStore.categoryGoodsFavor.map((item) => item.goodsFavor)
})

// 地图
const mapData = computed(() => {
  return analysisStore.addressGoodsSale
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
</style>
