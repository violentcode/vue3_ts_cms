import { createPinia } from "pinia"
import type { App } from "vue"
import useLoginStore from "../store/login/login"

const pinia = createPinia()

function registerStore(app: App) {
  // 注册pinia
  app.use(pinia)

  // 刷新本地重新加载
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
