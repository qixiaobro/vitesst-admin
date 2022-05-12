<!--
 * @Author: qixiaobro
 * @Date: 2022-05-10 18:10:19
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-11 17:47:23
 * @Description: 数据卡片
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
interface Props {
  color: string
  title: string
  num: string
  icon: string
}
withDefaults(defineProps<Props>(), {
  color: 'indigo-600',
  title: '',
  num: '',
  icon: '',
})

</script>
<template>
  <div class="w-full h-30 rounded shadow-xl bg-white flex items-center p-25px box-border">
    <div class="w-60px h-60px rounded-full flex items-center justify-center mr-20px bg-opacity-25" :class="`bg-${color}`">
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
  </div>
</template>
<style scoped>
.color1{
  color:'text-indigo-600';
  background: 'bg-indigo-600';
}
.color2{
  color:'text-pink-600';
  background: 'bg-pink-600';
}
.color3{
  color:'text-yellow-600';
  background: 'bg-yellow-600';
}
.color4{
  color:'text-purple-600';
  background: 'bg-purple-600';
}
</style>
