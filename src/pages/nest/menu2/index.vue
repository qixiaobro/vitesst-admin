<script lang="ts" setup>
import { UseMenuStore } from '~/store/modules/menu'
const menuStore = UseMenuStore()
const reset = () => {
  menuStore.setMenuList([])
}
</script>

<template>
  <div>
    meun2
    <button @click="reset">
      reset
    </button>
  </div>
</template>

<style lang="scss" scoped>
</style>
