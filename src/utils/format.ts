import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
// 使用本功能需先配置 UTC 插件，才能正常运行
dayjs.extend(utc)

// 格式化UTC的函数
export function formatUTC(
  utcString: string,
  format: string = "YYYY/MM/DD HH:mm:ss"
) {
  //因为转换到的是零时区的时间，所以要utcOffset往后便宜8小时
  const resTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resTime
}
