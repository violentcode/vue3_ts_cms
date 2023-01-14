import {
  postEntiredepartment,
  postEntireRole,
  postEntirMenu
} from "@/service/main/main"
import { defineStore } from "pinia"

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore("main", {
  state: (): IMainState => {
    return {
      entireRoles: [],
      entireDepartments: [],
      entireMenus: []
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const roleRes: any = await postEntireRole()
      const departmentRes: any = await postEntiredepartment()
      const menuRes: any = await postEntirMenu()

      this.entireRoles = roleRes.data.list
      this.entireDepartments = departmentRes.data.list
      this.entireMenus = menuRes.data.list
    }
  }
})

export default useMainStore
