<!--
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:53:28
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-07 11:30:23
 * @Description: 首页
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup>
import { userLogin } from '~/api/modules/user'
import { useAppStore } from '~/store/app'

const app = useAppStore()

const handleUserLogin = async (params: any) => {
  const { data } = await userLogin(params)
  return data
}
</script>
<template>
  Welcome to {{ app.appName }} App
  <div>
    app name:
    <input v-model="app.appName">
  </div>
  <div>
    <button @click="handleUserLogin">
      Login
    </button>
  </div>
</template>
