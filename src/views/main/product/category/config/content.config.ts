const contentCofig = {
  pageName: "category",
  header: {
    title: "类别列表",
    btnTitle: "新建类别"
  },
  propsList: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },

    { type: "normal", label: "类别名称", prop: "name" },

    { type: "timer", label: "创建时间", prop: "createAt", width: "400px" },
    { type: "timer", label: "更新时间", prop: "updateAt", width: "400px" },

    { type: "handler", label: "操作", width: "150px" }
  ]
}
export default contentCofig
