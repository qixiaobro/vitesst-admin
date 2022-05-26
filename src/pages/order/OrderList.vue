<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-26 20:31:13
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import { useTable } from '~/composables/useTable'
import { getOrderList } from '~/api/modules/order'
import { timeStampToDate } from '~/composables/timeFormat'

const tableHeight = ref('auto')

// 订单状态
const orderStatusOptions = [
  {
    value: '0',
    label: '未支付',
  },
  {
    value: '1',
    label: '支付待确认',
  },
  {
    value: '2',
    label: '已支付',
  },
  {
    value: '-1',
    label: '已退款',
  },
]

const payOptions = [
  {
    value: 'weixin',
    label: '微信',
  },
  {
    value: 'alipay',
    label: '支付宝',
  },
  {
    value: 'offline',
    label: '对公',
  },
]

const { tableData, loading, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(getOrderList)

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

function dealType(now_status: number) {
  return ['warning', 'success', ''][now_status] as '' | 'success' | 'warning' | 'info' | 'danger'
}

function dealType2(now_status: number) {
  return ['', 'info', 'success'][now_status] as '' | 'success' | 'warning' | 'info' | 'danger'
}

onMounted(() => {
  tableHeight.value = `${window.innerHeight - 430}px`
})

onActivated(() => {
  getTableList()
})

</script>
<template>
  <div class="w-full rounded shadow-xl bg-white p-5 box-border">
    <!--搜索表单-->
    <el-form ref="queryFormRef" :inline="true" :model="searchParam">
      <el-form-item label="支付状态" prop="status">
        <el-select v-model="searchParam.status" clearable @change="search">
          <el-option v-for="(item, index) in orderStatusOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-select v-model="searchParam.pay_type" clearable @change="search">
          <el-option v-for="(item, index) in payOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="支付时间" prop="data">
        <el-date-picker
          v-model="data" type="daterange" range-separator="-" start-placeholder="开始时间"
          value-format="YYYY/MM/DD" end-placeholder="结束时间" clearable style="width:250px" size="small"
        />
      </el-form-item>
      <el-form-item prop="pay_type">
        <el-input v-model="searchParam.keyword" placeholder="客户手机号/客户昵称" clearable @change="search" />
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
        v-loading="loading" w-full :data="tableData" stripe size="large" highlight-current-row
        style="width: 100%" header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="order_id" show-overflow-tooltip label="订单号" align="center" min-width="170" />
        <el-table-column prop="customer_name" show-overflow-tooltip label="客户昵称" align="center" min-width="170" />
        <el-table-column prop="customer_phone" show-overflow-tooltip label="客户手机号" align="center" min-width="150" />
        <el-table-column prop="price" show-overflow-tooltip label="充值金额（元）" align="center" min-width="150" />
        <el-table-column prop="give_price" show-overflow-tooltip label="购买赠送金额（元）" align="center" min-width="150" />
        <el-table-column prop="pay_type_name" show-overflow-tooltip label="支付方式" align="center" min-width="150" />
        <el-table-column prop="paid" show-overflow-tooltip label="支付状态" align="center" min-width="120">
          <template #default="scope">
            <El-tag :type="dealType(scope.row.paid)">
              {{ ['未支付', '已支付', '支付待确认'][scope.row.paid] }}
            </El-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_time" show-overflow-tooltip label="支付时间" align="center" min-width="180"
          :formatter="(row, column, cellValue, index) => timeStampToDate(cellValue * 1000)"
        />
        <el-table-column prop="refund_status" show-overflow-tooltip label="退款状态" align="center" min-width="150">
          <template #default="scope">
            <El-tag :type="dealType2(scope.row.refund_status)">
              {{ ['未退款', '申请中', '已退款'][scope.row.refund_status] }}
            </El-tag>
          </template>
        </el-table-column>
        <el-table-column prop="refund_price" show-overflow-tooltip label="退款金额（元）" align="center" min-width="180" />

        <el-table-column prop="mark" show-overflow-tooltip label="备注" align="center" min-width="120" />
        <!-- <el-table-column label="操作" fixed="right" header-align="center" min-width="200">
          <template #default="scope">
            <div class="w-full flex items-center justify-center" />
          </template>
        </el-table-column> -->
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
