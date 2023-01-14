class Cache {
  constructor(isSeccion: boolean) {
    if (isSeccion) {
      this.storage = sessionStorage
    } else {
      this.storage = localStorage
    }
  }
  storage: any
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clearCache() {
    this.storage.clear()
  }
}
export const loaclCache = new Cache(false)
export const sessionCache = new Cache(true)
