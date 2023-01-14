import router from "@/router"
import type { RouteRecordRaw } from "vue-router"
import { loaclCache } from "./cache"
export let firstMenu: any = null
export default function mapMenusToRoutes(userMenus: any[]) {
  // 5.1.动态获取所有路由对象文件，放在数组中
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob("@/router/main/**/*.ts", {
    eager: true
  })
  for (const key in files) {
    const value = files[key]
    localRoutes.push(value.default)
  }
  // 5.2.将数组中与菜单匹配的route动态添加到router中
  const routes: RouteRecordRaw[] = []
  userMenus.forEach((menu: any) => {
    const children = menu.children
    children.forEach((subMenu: any) => {
      localRoutes.forEach((route) => {
        if (subMenu.url === route.path) {
          // 给一级菜单设置路由以及重定向（默认重定向到第一个二级路由）
          if (!routes.find((item) => item.path === menu.url)) {
            routes.push({ path: menu.url, redirect: route.path })
          }
          routes.push(route)
          if (!firstMenu) firstMenu = subMenu
        }
      })
    })
  })
  return routes
}

// 将当前的路径转换为userMenu中对应的id
export function mapPathToMenu(path: string) {
  const userMenu = loaclCache.getCache("userMenu")
  let id = -1
  userMenu.forEach((item: any) => {
    const menu = item.children.filter((menu: any) => menu.url === path)
    if (menu.length) {
      id = menu[0].id
    }
  })
  return id
}

// 将当前路径转换成对应的name
export function mapPathToName(path: string) {
  let subMenu = ""
  let menu = ""
  let subMenuUrl = ""
  const userMenu = loaclCache.getCache("userMenu")
  userMenu.forEach((item: any) => {
    item.children.forEach((iten: any) => {
      if (iten.url === path) {
        subMenu = item.name
        menu = iten.name
        subMenuUrl = item.children[0].url
      }
    })
  })
  return {
    subMenu,
    menu,
    subMenuUrl
  }
}

// 通过menuList映射checkKeys
export function mapMenuListToCheckKeys(menuList: any[], checkKeys: any[]) {
  menuList.forEach((item) => {
    if (item.children) {
      mapMenuListToCheckKeys(item.children, checkKeys)
    } else {
      checkKeys.push(item.id)
    }
  })
  return checkKeys
}

// 通过menuList映射按钮权限
export function mapUserMenuToPermissions(userMenu: any[]) {
  const permissions: any[] = []
  function mapMenuToPermissions(userMenu: any[]) {
    userMenu.forEach((item) => {
      if (item.children) {
        mapMenuToPermissions(item.children)
      } else if (item.permission) {
        permissions.push(item.permission)
      } else {
        return
      }
    })
  }
  mapMenuToPermissions(userMenu)

  return permissions
}
