const contentCofig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  propsList: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },

    { type: "normal", label: "角色名称", prop: "name" },
    { type: "normal", label: "权限介绍", prop: "intro" },

    { type: "timer", label: "创建时间", prop: "createAt", width: "360px" },
    { type: "timer", label: "更新时间", prop: "updateAt", width: "360px" },

    { type: "handler", label: "操作", width: "150px" }
  ]
}
export default contentCofig
