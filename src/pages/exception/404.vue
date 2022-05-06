<!--
 * @Author: qixiaobro
 * @Date: 2022-05-06 10:00:36
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-06 10:00:44
 * @Description: 404页面
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script setup lang="ts">
const router = useRouter()
const goBack = () => {
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <el-row>
    <el-col>
      <el-result icon="warning" title="页面未找到" sub-title="请检查路径后重试或返回首页">
        <template #extra>
          <el-button type="primary" @click="goBack">
            Back
          </el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>
