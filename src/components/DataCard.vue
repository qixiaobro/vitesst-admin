<!--
 * @Author: qixiaobro
 * @Date: 2022-05-10 18:10:19
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-26 14:55:58
 * @Description: 数据卡片
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
interface Props {
  color: string
  title: string
  num: string
  icon: string
  detail?: boolean
}
withDefaults(defineProps<Props>(), {
  color: 'indigo-600',
  title: '',
  num: '',
  icon: '',
  detail: false,
})

</script>
<template>
  <div class="w-full h-30 rounded shadow-xl bg-white flex items-center p-25px box-border">
    <div
      class="w-60px h-60px rounded-full flex items-center justify-center mr-20px bg-opacity-25"
      :class="`bg-${color}`"
    >
      <div class="w-40px h-40px rounded-full flex items-center justify-center" :class="`bg-${color}`">
        <div text-xl text-white :class="icon" />
      </div>
    </div>
    <div text-left>
      <p class="text-3xl font-bold m-1" :class="`text-${color}`">
        {{ num }}
      </p>
      <p class="text-sm m-1 text-gray-500">
        {{ title }}
      </p>
    </div>
    <div v-if="detail" ml-auto content-end flex items-center pt-10 cursor-pointer text-gray-500 text-sm>
      详情
      <svg
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
        class="iconify iconify--ion" width="18" height="18" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"
      >
        <path
          d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
          fill="#888888"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped>
.color1 {
  color: 'text-indigo-600';
  background: 'bg-indigo-600';
}

.color2 {
  color: 'text-pink-600';
  background: 'bg-pink-600';
}

.color3 {
  color: 'text-yellow-600';
  background: 'bg-yellow-600';
}

.color4 {
  color: 'text-purple-600';
  background: 'bg-purple-600';
}

.color5 {
  color: 'text-red-600';
  background: 'bg-red-600';
}

.color5 {
  color: 'text-green-600';
  background: 'bg-green-600';
}

.color7 {
  color: 'text-blue-600';
  background: 'bg-blue-600';
}
</style>
