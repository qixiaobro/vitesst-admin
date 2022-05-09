/*
 * @Author: qixiaobro
 * @Date: 2022-05-05 15:51:20
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-09 23:57:54
 * @Description: main.ts
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'

// Element icons

import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

import './styles/element/index.scss'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

