let BASE_URL = ""
if (import.meta.env.MODE === "development") {
  BASE_URL = "http://152.136.185.210:4000" //开发环境
} else {
  BASE_URL = "http://152.136.185.210:5000" //生产环境
}

export const TIME_OUT = 1000
export { BASE_URL }
