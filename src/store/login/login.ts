import { defineStore } from "pinia"
import {
  accountLoginRequest,
  getUserInfoRequest,
  getUserMenuRequest
} from "@/service/login/login"
import type { IAcctount } from "@/types"
import { loaclCache } from "@/utils/cache"
import router from "@/router"
import { LOGIN_TOKEN } from "@/global/constant"
import mapMenusToRoutes, { mapUserMenuToPermissions } from "@/utils/map-menus"
import useMainStore from "../main/main"
interface IloginState {
  token: string
  userInfo?: any
  userMenu?: any
  permissions: any[]
}

const useLoginStore = defineStore("login", {
  state: (): IloginState => {
    return {
      token: "",
      userInfo: {},
      userMenu: [],
      permissions: []
    }
  },
  actions: {
    async accountLoginAction(account: IAcctount) {
      const loginRes: any = await accountLoginRequest(account)
      // 账号密码错误的逻辑
      if (!loginRes.data?.token) {
        return
      }

      // 账号密码正确的逻辑
      const id = loginRes.data.id
      const name = loginRes.data.name
      this.token = loginRes.data.token

      // 1.对token进行本地缓存
      loaclCache.setCache(LOGIN_TOKEN, this.token)

      // 2.根据id获取到个人信息(主要是为了获取role的id)
      const userInfoRes = await getUserInfoRequest(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 3.根据id获取到权限菜单
      const userMenuRes = await getUserMenuRequest(this.userInfo.role.id)
      const userMenu = userMenuRes.data
      this.userMenu = userMenu

      // 4.个人信息和权限菜单本地缓存
      loaclCache.setCache("userInfo", userInfo)
      loaclCache.setCache("userMenu", userMenu)

      // 5.调用获取角色和部门信息的请求
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 6.获取用户所有按钮权限
      const permissions = mapUserMenuToPermissions(userMenu)
      this.permissions = permissions
      console.log(permissions)

      // 7.动态添加路由
      const routes = mapMenusToRoutes(userMenu)
      for (const route of routes) {
        router.addRoute("main", route)
      }

      // 8.登录成功进行页面跳转
      router.push("/main")
    },
    // 刷新页面执行的action
    loadLocalCacheAction() {
      const token = loaclCache.getCache(LOGIN_TOKEN)
      const userInfo = loaclCache.getCache("userInfo")
      const userMenu = loaclCache.getCache("userMenu")
      // 刷新页面会将本地获取数据
      this.token = token
      this.userInfo = userInfo
      this.userMenu = userMenu

      if (token) {
        // 拿到userMenu后重新动态加载路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => {
          router.addRoute("main", route)
        })

        // 刷新后获取按钮权限
        const permissions = mapUserMenuToPermissions(userMenu)
        this.permissions = permissions

        // 刷新页面后重新获取角色和部门信息
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      }
    }
  }
})

export default useLoginStore
