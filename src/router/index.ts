import { createRouter, createWebHashHistory } from "vue-router"
import { loaclCache } from "@/utils/cache"
import mapMenusToRoutes, { firstMenu } from "@/utils/map-menus"
const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMath(.*)",
      component: () => import("../views/not-found/NotFound.vue")
    }
  ],
  history: createWebHashHistory()
})

// 路由导航守卫
router.beforeEach((to, from) => {
  const token = loaclCache.getCache("token")
  // 只要没登录就跳转到登陆页面
  if (to.path.startsWith("/main") && !token) {
    return "/login"
  }

  // 只要是跳转到main并且登录了，就跳转到第一个路由
  if (to.path === "/main") {
    return firstMenu.url
  }
})
export default router
