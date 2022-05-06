/*
 * @Author: qixiaobro
 * @Date: 2022-05-05 15:51:20
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-06 10:22:39
 * @Description: main.ts
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
 */
import App from './App.vue'
import router from './router'

import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
