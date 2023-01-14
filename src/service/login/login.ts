import myRequest from ".."
import type { IAcctount } from "@/types"

export function accountLoginRequest(account: IAcctount) {
  return myRequest.post({
    url: "/login",
    data: account
  })
}

export function getUserInfoRequest(id: number) {
  return myRequest.get<any>({
    url: `/users/${id}`
  })
}

export function getUserMenuRequest(id: number) {
  return myRequest.get<any>({
    url: `/role/${id}/menu`
  })
}
