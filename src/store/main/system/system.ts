import {
  deleteUserListData,
  postNewUserData,
  postUserListData,
  patchEditUserData,
  postPageListData,
  deletePageListData,
  postNewPageData,
  patchEditPageData
} from "@/service/main/system/system"
import { defineStore } from "pinia"
import useMainStore from "../main"
import type { ISystemState } from "./type"
const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    userList: [],
    usertotalCount: 0,
    pageList: [],
    pagetotalCount: 0
  }),
  actions: {
    // 1.获取用户信息列表
    async postUserListDataAction(query: any) {
      const res: any = await postUserListData(query)
      const { list, totalCount } = res.data
      this.userList = list
      this.usertotalCount = totalCount
    },
    // 2.删除用户信息
    async deleteUserListDataAction(id: number) {
      // 删除数据
      const deleteRes = await deleteUserListData(id)

      // 删除后重新发送获取列表请求
      this.postUserListDataAction({ size: 10, offset: 0 })
    },
    // 3.新建用户信息
    async postNewUserDataAction(info: any) {
      // 新建数据
      const newRes = await postNewUserData(info)

      // 新建后重新发送获取列表请求
      this.postUserListDataAction({ size: 10, offset: 0 })
    },
    // 4.编辑用户信息
    async patchEmitUserDataAction(id: number, info: any) {
      const editRes = await patchEditUserData(id, info)

      // 编辑后重新发送获取列表请求
      this.postUserListDataAction({ size: 10, offset: 0 })
    },
    // ============抽取页面==================
    // 1.页面查询
    async postPageListDataAction(page: string, query: any) {
      const res: any = await postPageListData(page, query)
      console.log(res.data)
      const { list, totalCount } = res.data
      this.pageList = list
      this.pagetotalCount = totalCount
    },
    // 2.页面删除
    async deletePageListDataAction(page: string, id: number) {
      // 删除数据
      const deleteRes = await deletePageListData(page, id)

      // 删除后重新发送获取列表请求
      this.postPageListDataAction(page, { size: 10, offset: 0 })
    },
    // 3.新建用户信息
    async postNewPageDataAction(page: string, info: any) {
      // 新建数据
      const newRes = await postNewPageData(page, info)

      // 新建后重新发送获取列表请求
      this.postPageListDataAction(page, { size: 10, offset: 0 })

      // 重新获得数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 4.编辑用户信息
    async patchEmitPageDataAction(page: string, id: number, info: any) {
      const editRes = await patchEditPageData(page, id, info)

      // 编辑后重新发送获取列表请求
      this.postPageListDataAction(page, { size: 10, offset: 0 })

      // 重新获得数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
