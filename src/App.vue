<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <main font-sans text="gray-700">
      <router-view />
    </main>
  </el-config-provider>
</template>
