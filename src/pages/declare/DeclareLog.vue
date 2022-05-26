<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-26 15:06:05
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import { useTable } from '~/composables/useTable'
import { getDeclareRecord } from '~/api/modules/declare'
import { timeStampToDate } from '~/composables/timeFormat'

const tableHeight = ref('auto')
onMounted(() => {
  tableHeight.value = `${window.innerHeight - 290}px`
})

const options = [
  {
    value: 'company_name',
    label: '公司名称',
  },
  {
    value: 'nickname',
    label: '客户昵称',
  },
  {
    value: 'phone',
    label: '客户手机号',
  },
  {
    value: 'legal_person_id_card',
    label: '法人身份证',
  },
]

const { tableData, loading, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(getDeclareRecord)

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

  search()
})

onActivated(() => {
  getTableList()
})

</script>
<template>
  <div class="w-full rounded shadow-xl bg-white p-5 box-border">
    <!--搜索表单-->
    <el-form ref="queryFormRef" :inline="true" :model="searchParam">
      <el-form-item label="搜索" prop="field_name" style="margin-right:0">
        <el-select v-model="searchParam.field_name" style="width:125px">
          <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="field_value">
        <el-input
          v-model="searchParam.field_value" style="width:120px;margin-left:-5px" placeholder="请输入查询内容" clearable
          @change="search"
        />
      </el-form-item>
      <el-form-item label="支付时间" prop="data">
        <el-date-picker
          v-model="data" type="daterange" range-separator="-" start-placeholder="开始时间"
          value-format="YYYY/MM/DD" end-placeholder="结束时间" clearable style="width:250px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="search">
          查询
        </el-button>
        <el-button type="primary" plain auto-insert-space @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <div class="data-table w-full">
      <el-table
        v-loading="loading"
        w-full :data="tableData" stripe size="large" highlight-current-row style="width: 100%"
        header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="company_name" show-overflow-tooltip label="企业名称" min-width="150" />
        <el-table-column prop="customer_name" show-overflow-tooltip label="昵称" align="center" min-width="170" />
        <el-table-column prop="customer_phone" show-overflow-tooltip label="客户手机号" align="center" min-width="150" />
        <el-table-column prop="declaration_date" show-overflow-tooltip label="申报日期" align="center" min-width="150" :formatter="(row, column, cellValue, index) => timeStampToDate(cellValue * 1000)" />
        <el-table-column
          prop="legal_person_id_card" show-overflow-tooltip label="法人身份证" align="center"
          min-width="180"
        />
        <el-table-column prop="legal_person_phone" show-overflow-tooltip label="法人手机号" align="center" min-width="150" />
        <el-table-column prop="add_time" show-overflow-tooltip label="添加时间" align="center" min-width="180" :formatter="(row, column, cellValue, index) => timeStampToDate(cellValue * 1000)" />
        <!-- <el-table-column prop="mark" show-overflow-tooltip label="备注" align="center" min-width="120" /> -->
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default>
            <el-button text size="small">
              Detail
            </el-button>
            <el-button text size="small">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div w-full flex justify-end mt-5>
      <el-pagination
        :current-page="pageable.page" :page-size="pageable.limit"
        :page-sizes="[10, 20, 50, 100]" background layout="total, sizes, prev, pager, next, jumper" :total="pageable.count"
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
