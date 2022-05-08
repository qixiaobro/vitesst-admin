/*
 * @Author: qixiaobro
 * @Date: 2022-05-05 15:51:20
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-08 15:10:10
 * @Description: main.ts
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import App from './App.vue'
import router from './router'

// Element icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

import './styles/element/index.scss'


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}