import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import { router } from './router'

// import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

