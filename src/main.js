import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/globalStyle.css"
import router from "./router/"
import store from './store'


const app= createApp(App);
app.use(router).use(store).mount("#app")
