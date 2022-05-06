<!--
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:53:28
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-06 11:15:43
 * @Description: 首页
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup>
import { userLogin } from '~/api/modules/user'

const handleUserLogin = async (params: any) => {
  const { data } = await userLogin(params)
  return data
}
</script>
<template>
  homesss
  <button @click="handleUserLogin">
    Login
  </button>
</template>
