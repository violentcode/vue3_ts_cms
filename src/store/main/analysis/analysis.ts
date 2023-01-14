import {
  getaddressGoodsSale,
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "@/service/main/analysis/analysis"
import { defineStore } from "pinia"

interface IAnalysisState {
  amountList: any[]
  categoryGoodsCount: any[]
  categoryGoodsSale: any[]
  categoryGoodsFavor: any[]
  addressGoodsSale: any[]
}

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountList: [],
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    addressGoodsSale: []
  }),
  actions: {
    // 获取顶部展示的数据
    async getAmountListAction() {
      const res: any = await getAmountList()
      this.amountList = res.data
    },
    // 获取Echarts展示的数据
    getDashboardDataAction() {
      getCategoryGoodsCount().then((res: any) => {
        this.categoryGoodsCount = res.data
      })
      getCategoryGoodsSale().then((res: any) => {
        this.categoryGoodsSale = res.data
      })
      getCategoryGoodsFavor().then((res: any) => {
        this.categoryGoodsFavor = res.data
      })
      getaddressGoodsSale().then((res: any) => {
        this.addressGoodsSale = res.data
      })
    }
  }
})

export default useAnalysisStore
