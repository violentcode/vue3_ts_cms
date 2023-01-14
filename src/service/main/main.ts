import myRequest from ".."

// 获取全部角色信息
export function postEntireRole() {
  return myRequest.post({
    url: "/role/list"
  })
}

// 获取全部部门信息
export function postEntiredepartment() {
  return myRequest.post({
    url: "/department/list"
  })
}

// 获取全部菜单信息
export function postEntirMenu() {
  return myRequest.post({
    url: "/menu/list"
  })
}
