import App from './App.vue'

// import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'

import { setupDirectives } from './directives'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
setupDirectives(app)
app.mount('#app')

