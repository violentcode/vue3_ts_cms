const contentCofig = {
  pageName: "goods",
  header: {
    title: "商品列表",
    btnTitle: "新建商品"
  },
  propsList: [
    { type: "selection", label: "选择", width: "60px" },
    { type: "index", label: "序号", width: "60px" },

    {
      type: "normal",
      label: "商品名称",
      prop: "name",
      width: "100px",
      tips: true
    },
    { type: "normal", label: "原价格", prop: "oldPrice" },
    { type: "normal", label: "新价格", prop: "newPrice" },
    {
      type: "normal",
      label: "商品描述",
      prop: "desc",
      width: "100px",
      tips: true
    },
    { type: "slot", label: "状态", prop: "status", slotName: "tag" },

    { type: "slot", label: "图片", prop: "imgUrl", slotName: "img" },

    { type: "normal", label: "库存", prop: "inventoryCount" },
    { type: "normal", label: "销量", prop: "saleCount" },
    { type: "normal", label: "收藏", prop: "favorCount" },
    { type: "normal", label: "地址", prop: "address" },

    { type: "timer", label: "创建时间", prop: "createAt", width: "170px" },
    { type: "timer", label: "更新时间", prop: "updateAt", width: "170px" },

    { type: "handler", label: "操作", width: "150px" }
  ]
}
export default contentCofig
