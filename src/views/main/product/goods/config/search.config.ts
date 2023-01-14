const searchConfig = {
  pageName: "goods",
  formItems: [
    {
      type: "input",
      label: "商品名称",
      prop: "name",
      placeholder: "请输入商品名称"
    },
    {
      type: "input",
      label: "商品地址",
      prop: "address",
      placeholder: "请输入商品地址"
    },
    {
      type: "select",
      label: "状态",
      placeHolder: "请选择状态",
      rules: [],
      prop: "status",
      options: [
        { label: "可用", value: 1 },
        { label: "下架", value: 0 }
      ]
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间"
    }
  ]
}
export default searchConfig
