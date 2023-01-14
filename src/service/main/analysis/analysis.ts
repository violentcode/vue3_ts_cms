import myRequest from "@/service"

export function getAmountList() {
  return myRequest.get({
    url: "/goods/amount/list"
  })
}

export function getCategoryGoodsCount() {
  return myRequest.get({
    url: "/goods/category/count"
  })
}

export function getCategoryGoodsSale() {
  return myRequest.get({
    url: "/goods/category/sale"
  })
}
export function getCategoryGoodsFavor() {
  return myRequest.get({
    url: "/goods/category/favor"
  })
}
export function getaddressGoodsSale() {
  return myRequest.get({
    url: "/goods/address/sale"
  })
}
