const searchConfig = {
  pageName: "role",
  formItems: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入查询的角色名称"
    },
    {
      type: "input",
      prop: "intro",
      label: "权限介绍",
      placeholder: "请输入查询的权限介绍"
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间"
    }
  ]
}
export default searchConfig
