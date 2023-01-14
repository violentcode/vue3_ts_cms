const modalConfig = {
  pageName: "goods",
  header: {
    newTitle: "新建商品",
    editTitle: "编辑商品"
  },
  formItems: [
    {
      type: "input",
      label: "商品名称",
      prop: "name",
      placeholder: "请输入商品名称"
    },
    {
      type: "input",
      label: "原价格",
      prop: "oldPrice",
      placeholder: "请输入原价格"
    },
    {
      type: "input",
      label: "新价格",
      prop: "newPrice",
      placeholder: "请输入新价格"
    },
    {
      type: "input",
      label: "商品描述",
      prop: "desc",
      placeholder: "请输入商品描述"
    },
    {
      type: "input",
      label: "库存",
      prop: "inventoryCount",
      placeholder: "请输入库存"
    },
    {
      type: "input",
      label: "销量",
      prop: "saleCount",
      placeholder: "请输入商品销量"
    },
    {
      type: "input",
      label: "收藏",
      prop: "favorCount",
      placeholder: "请输入商品收藏"
    },
    {
      type: "input",
      label: "发货地址",
      prop: "address",
      placeholder: "请输入发货地址"
    }
  ]
}
export default modalConfig

// "name": "13",
// "oldPrice": 100,
// "newPrice": 88,
// "desc": "cba",
// "status": 1,
// "imgUrl": "www.itsiyuan.com/abc.png",
// "inventoryCount": 100,
// "saleCount": 100,
// "favorCount": 199,
// "address": "北京"
