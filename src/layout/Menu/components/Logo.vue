<script setup lang="ts">
defineProps<{ isCollapse: boolean }>()

</script>

<template>
  <div h-60px flex items-center justify-center :style="{ width: isCollapse ? '65px' : '220px' }">
    <img v-show="!isCollapse" src="../../../assets/images/logo.png" w-100px alt="logo">
    <img v-show="isCollapse" src="../../../assets/images/logo-m.png" w-30px alt="logo">
  </div>
</template>
