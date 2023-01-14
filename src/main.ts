import { createApp } from "vue"
import "normalize.css"
import "./assets/css/index.css"
import router from "./router"
import pinia from "./store"
import registerIcon from "./global/registerIcon"
import App from "./App.vue"

const app = createApp(App)

app.use(registerIcon)

app.use(pinia)
app.use(router)
app.mount("#app")
