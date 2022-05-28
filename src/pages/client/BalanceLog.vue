<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-28 15:45:14
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import { useTable } from '~/composables/useTable'
import { getBalanceChangeList } from '~/api/modules/client'
import { timeStampToDate } from '~/composables/timeFormat'

const tableHeight = ref('auto')

const route = useRoute()

const { phone } = route.query

const { tableData, loading, pageable, searchParam, initSearchParam, search, getTableList, reset, handleSizeChange, handleCurrentChange } = useTable(getBalanceChangeList)

searchParam.value.keyword = phone
initSearchParam.value.keyword = phone
/**
 * @description: 监听时间查询
 * @return {*}
 */
const data = ref([])
watch(data, (val) => {
  if (val && Array.isArray(val) && val.length > 0)
    searchParam.value.data = val.join('-')

  else
    searchParam.value.data = ''

  if (!(Array.isArray(val) && val.length === 0))
    search()
})

/**
 * @description: 重置时间
 * @return {*}
 */
const resetData = () => {
  data.value = []
}

onMounted(() => {
  tableHeight.value = `${window.innerHeight - 290}px`
  getTableList()
})

</script>
<template>
  <div class="w-full rounded shadow-xl bg-white p-5 box-border">
    <!--搜索表单-->
    <el-form ref="queryFormRef" :inline="true" :model="searchParam">
      <el-form-item label="变更时间" prop="data">
        <el-date-picker
          v-model="data" type="daterange" range-separator="-" start-placeholder="开始时间"
          value-format="YYYY/MM/DD" end-placeholder="结束时间" clearable style="width:250px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="search">
          查询
        </el-button>
        <el-button type="primary" plain auto-insert-space @click="()=>{reset();resetData()}">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <div class="data-table w-full">
      <el-table
        v-loading="loading" w-full :data="tableData" stripe size="large" highlight-current-row
        style="width: 100%" header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="customer_name" show-overflow-tooltip label="昵称" align="center" min-width="170" />
        <el-table-column prop="customer_phone" show-overflow-tooltip label="客户手机号" align="center" min-width="150" />
        <el-table-column prop="title" show-overflow-tooltip label="变更项目" align="center" min-width="150" />
        <el-table-column prop="number" show-overflow-tooltip label="变更金额（元）" align="center" min-width="150" />
        <el-table-column prop="balance" show-overflow-tooltip label="变更后余额（元）" align="center" min-width="120" />
        <el-table-column prop="add_time" show-overflow-tooltip label="变更时间" align="center" min-width="180" :formatter="(row, column, cellValue, index) => timeStampToDate(cellValue * 1000)" />
        <el-table-column prop="mark" show-overflow-tooltip label="备注" align="center" min-width="120" />
      </el-table>
    </div>
    <div w-full flex justify-end mt-5>
      <el-pagination
        :current-page="pageable.page" :page-size="pageable.limit" :page-sizes="[10, 20, 50, 100]"
        background layout="total, sizes, prev, pager, next, jumper" :total="pageable.count"
        @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-style {
  background: red;
}
</style>
