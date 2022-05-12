<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-12 10:55:35
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import type { FormInstance } from 'element-plus/lib/components/form'

const tableHeight = ref('auto')
onMounted(() => {
  tableHeight.value = `${window.innerHeight - 290}px`
})
const options = [
  {
    value: '1',
    label: '公司名称',
  },
  {
    value: '2',
    label: '客户昵称',
  },
  {
    value: '3',
    label: '客户手机号',
  },
  {
    value: '4',
    label: '法人身份证',
  },
]
const queryForm = reactive({
  user: '',
  region: '',
  date: '',
})

const page = ref(0)
const limit = ref(10)

const onSubmit = () => {

}

const queryFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.resetFields()
}

const handleClick = () => {
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

/**
 * @description: 搜索数据
 * @param {*}
 * @return {*}
 */
const handleSearch = () => {

}

/**
 * @description: 处理每页条数变化
 * @param {*} val
 * @return {*}
 */
const handleSizeChange = (val: number) => {
  limit.value = val
  page.value = 0
  handleSearch()
}

/**
 * @description: 处理页码变化
 * @param {*} val
 * @return {*}
 */
const handleCurrentChange = (val: number) => {
  page.value = val
  handleSearch()
}

</script>
<template>
  <div class="w-full rounded shadow-xl bg-white p-5 box-border">
    <!--搜索表单-->
    <el-form ref="queryFormRef" :inline="true" :model="queryForm">
      <el-form-item label="搜索" prop="region" style="margin-right:0">
        <el-select v-model="queryForm.region" style="width:125px">
          <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="user">
        <el-input v-model="queryForm.user" style="width:120px;margin-left:-5px" placeholder="请输入查询内容" clearable />
      </el-form-item>
      <el-form-item label="申报时间" prop="date">
        <el-date-picker
          v-model="queryForm.date" type="daterange" range-separator="-" start-placeholder="开始时间"
          end-placeholder="结束时间" clearable style="width:250px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="onSubmit">
          查询
        </el-button>
        <el-button type="primary" plain auto-insert-space @click="resetForm(queryFormRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <div class="data-table w-full">
      <el-table
        w-full :data="tableData" stripe size="large" highlight-current-row style="width: 100%"
        header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="date" label="企业名称" min-width="150" />
        <el-table-column prop="date" label="客户昵称" min-width="150" />
        <el-table-column prop="name" label="客户手机号" min-width="120" />
        <el-table-column prop="zip" label="法人身份证" min-width="120" />
        <el-table-column prop="zip" label="法人手机号" min-width="120" />
        <el-table-column prop="zip" label="申报时间" min-width="120" />
        <el-table-column prop="remark" label="备注" min-width="120" />
        <el-table-column label="Operations" fixed="right" min-width="120">
          <template #default>
            <el-button text size="small" @click="handleClick">
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
        v-model:currentPage="page" v-model:page-size="limit"
        :page-sizes="[10, 20, 50, 100]" background layout="total, sizes, prev, pager, next, jumper" :total="400"
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
