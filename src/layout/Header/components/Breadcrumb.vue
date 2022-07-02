<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()

const matched = computed(() => route.matched.filter(item => item.meta && item.meta.title))
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="item in matched" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
