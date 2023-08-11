import { createApp } from 'vue'
import App from './App.vue'
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'

const app = createApp(App)
app.use(vueAwesomeSidebar)
app.mount("#app")