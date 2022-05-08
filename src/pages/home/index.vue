<!--
 * @Author: qixiaobro
 * @Date: 2022-05-06 09:53:28
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-08 10:15:43
 * @Description: 首页
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup>
import { userLogin } from '~/api/modules/user'
const handleUserLogin = async (params: any) => {
  const { data } = await userLogin(params)
  return data
}

const open = () => {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>
<template>

  <div>
    <button @click="open">
      Login
    </button>
  </div>
</template>
