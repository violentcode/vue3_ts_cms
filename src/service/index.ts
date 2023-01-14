import MYRequest from "./request"
import { BASE_URL, TIME_OUT } from "./config"
import { loaclCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constant"
// 全局Request
const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccess(config) {
      const token = loaclCache.getCache(LOGIN_TOKEN)

      if (config.headers && token)
        config.headers!.Authorization = "Bearer " + token
      return config
    }
  }
})

export default myRequest
