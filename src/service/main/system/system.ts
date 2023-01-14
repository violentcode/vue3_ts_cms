import myRequest from "@/service"

// 获取个人用户列表
export function postUserListData(query: any) {
  return myRequest.post({
    url: "/users/list",
    data: query
  })
}

// 删除用户信息
export function deleteUserListData(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}

// 新建用户信息
export function postNewUserData(info: any) {
  return myRequest.post({
    url: "/users",
    data: info
  })
}

// 编辑用户信息
export function patchEditUserData(id: number, info: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: info
  })
}

// =============页面抽取===================
// 页面获取用户列表
export function postPageListData(page: string, query: any) {
  return myRequest.post({
    url: `/${page}/list`,
    data: query
  })
}
// 页面删除用户
export function deletePageListData(page: string, id: number) {
  return myRequest.delete({
    url: `/${page}/${id}`
  })
}

// 页面新建用户信息
export function postNewPageData(page: string, info: any) {
  return myRequest.post({
    url: `/${page}`,
    data: info
  })
}

// 页面编辑用户信息
export function patchEditPageData(page: string, id: number, info: any) {
  return myRequest.patch({
    url: `/${page}/${id}`,
    data: info
  })
}
