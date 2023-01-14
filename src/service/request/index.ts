import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import type { MYRequestConfig } from "./type"

class MYRequest {
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)

    // 给每个实例创建全局拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        // console.log('响应失败')
        return err
      }
    )

    // 局部拦截器
    const { interceptors } = config
    if (interceptors) {
      const {
        requestSuccess,
        requestFailure,
        responseFailure,
        responseSuccess
      } = interceptors
      this.instance.interceptors.request.use(requestSuccess, requestFailure)
      this.instance.interceptors.response.use(responseSuccess, responseFailure)
    }
  }

  instance: AxiosInstance
  // 因为promise默认放回的是unknown，通过泛型传递给放回的promise的类型
  request<T = any>(config: MYRequestConfig<T>) {
    // 单次请求的成功拦截处理，拦截器本质上就是request中的一个个钩子函数
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
      // 给instance.request中的泛型传递属性
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: MYRequestConfig<T>) {
    return this.request<T>({ ...config, method: "get" })
  }

  post<T>(config: MYRequestConfig<T>) {
    return this.request<T>({ ...config, method: "post" })
  }

  delete<T>(config: MYRequestConfig<T>) {
    return this.request<T>({ ...config, method: "delete" })
  }

  patch<T>(config: MYRequestConfig<T>) {
    return this.request<T>({ ...config, method: "patch" })
  }
}

export default MYRequest
