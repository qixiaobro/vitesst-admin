<template>
  <div class="logo" flex items-center justify-center :style="{ width: isCollapse ? '65px' : '250px' }">
    <img :src="logo1" w-100px alt="logo" v-show="!isCollapse"/>
    <img :src="logo2" w-30px alt="logo" v-show="isCollapse"/>
    <!-- <span v-show="!isCollapse">Geeker Admin</span> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
const logo1 = new URL('src/assets/images/logo.png', window.location.href).href
const logo2 = new URL('src/assets/images/logo-m.png', window.location.href).href

</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
