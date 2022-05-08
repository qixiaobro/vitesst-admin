<script setup lang="ts">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Tabs from './Tabs/index.vue'
</script>

<template>
  <el-container>
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
        <Tabs />
      </el-header>
      <el-main bg-gray-100>
        <section class="main-box">
          <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" :key="route.path" />
              </keep-alive>
              <component :is="Component" v-else :key="route.path" />
            </transition>
          </router-view>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
