<script setup lang="ts">
import Logo from './components/Logo.vue'
import SubItem from './components/SubItem.vue'
import menuListJson from './json/menu.json'
import { UseMenuStore } from '~/store/modules/menu'

const route = useRoute()
const menuStore = UseMenuStore()

menuStore.setMenuList(menuListJson)
const activeMenu = computed((): string => route.path)
const isCollapse = computed((): boolean => menuStore.isCollapse)
const menuList = computed((): Menu.MenuOptions[] => menuStore.menuList)
const screenWidth = ref<number>(0)
const screenHeight = ref<number>(0)
// 监听窗口大小
const listeningWindow = () => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth
      screenHeight.value = document.body.clientHeight
      if (isCollapse.value === false && screenWidth.value < 1200)
        menuStore.setCollapse()
      if (isCollapse.value === true && screenWidth.value > 1200)
        menuStore.setCollapse()
    })()
  }
}
listeningWindow()
</script>

<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }" border-r h-100vh border-gray-200 transition-all>
    <Logo :is-collapse="isCollapse" />
    <div class="menu-box">
      <el-menu
        :default-active="activeMenu" :router="true" :collapse="isCollapse" :collapse-transition="false"
        :unique-opened="true" active-text-color="#409EFF" text-color="#6B7280"
      >
        <SubItem :menu-list="menuList" />
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";

.el-menu {
  border-right: none;
}
</style>
