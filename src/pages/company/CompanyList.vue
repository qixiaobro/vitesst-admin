<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-26 15:01:56
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import { useTable } from '~/composables/useTable'
import { changeDeclareStatus, deleteCompany, getCompanyList } from '~/api/modules/company'
import { timeStampToDate } from '~/composables/timeFormat'

const tableHeight = ref('auto')

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

const { tableData, loading, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(getCompanyList)

function dealType(now_status: number) {
  return ['warning', 'info', 'danger', 'success'][now_status] as '' | 'success' | 'warning' | 'info' | 'danger'
}
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

/**
 * @description: 修改申报状态
 * @return {*}
 */
const handleChangeDeclareStatus = async (id: number, status: number) => {
  try {
    await changeDeclareStatus({
      id,
      status,
    })
    ElMessage.success(status ? '申报成功' : '停止申报成功')
    getTableList()
  }
  catch (err: any) {
    ElMessage.error(err.msg || err.message)
  }
}

/**
 * @description: 删除公司
 * @return {*}
 */
const handleDeleteCompany = async (name: string, id: number) => {
  ElMessageBox.confirm(`确认删除 ${name} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await deleteCompany({
        id,
      })
      ElMessage.success('删除成功')
      getTableList()
    }
    catch (err: any) {
      ElMessage.error(err.msg || err.message)
    }
  })
}

/**
 * @description:
 * @return {*}
 */

onMounted(() => {
  tableHeight.value = `${window.innerHeight - 430}px`
})

onActivated(() => {
  getTableList()
})

</script>
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <DataCard color="green-600" title="公司总数（家）" num="30000" icon="i-carbon:connection-receive" />
    </el-col>
    <el-col :span="8">
      <DataCard color="blue-600" title="申报公司数（家）" num="30000" icon="i-carbon:data-reference" />
    </el-col>
    <el-col :span="8">
      <DataCard color="red-600" title="今日新增公司（家）" num="30000" icon="i-carbon:categories" />
    </el-col>
  </el-row>
  <div class="w-full rounded shadow-xl bg-white mt-5 p-5 box-border">
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
      <el-form-item label="申报状态" prop="status">
        <el-select v-model="searchParam.status" clearable>
          <el-option label="申报中" value="1" />
          <el-option label="未申报" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间" prop="data">
        <el-date-picker
          v-model="data" type="daterange" range-separator="-" value-format="YYYY/MM/DD"
          start-placeholder="开始时间" end-placeholder="结束时间" clearable style="width:250px"
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
        v-loading="loading" w-full :data="tableData" stripe size="large" highlight-current-row
        style="width: 100%" header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="company_name" show-overflow-tooltip label="企业名称" min-width="150" />
        <el-table-column prop="customer_name" show-overflow-tooltip label="昵称" align="center" min-width="170" />
        <el-table-column prop="customer_phone" show-overflow-tooltip label="客户手机号" align="center" min-width="150" />
        <el-table-column prop="status" show-overflow-tooltip label="申报状态" align="center" min-width="120">
          <template #default="scope">
            <El-tag class="ml-2" :type="scope.row.status === 0 ? 'warning' : 'success'">
              {{ scope.row.status === 0 ? '未申报' : '申报中' }}
            </El-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" show-overflow-tooltip label="当前申报状态" align="center" min-width="120">
          <template #default="scope">
            <El-tag class="ml-2" :type="dealType(scope.row.now_status)">
              {{ ['未申报', '申报中', '扣款失败', '申报成功'][scope.row.now_status] }}
            </El-tag>
          </template>
        </el-table-column>
        <el-table-column prop="national_tax_pwd" show-overflow-tooltip label="国税密码" align="center" min-width="150" />
        <el-table-column prop="personal_tax_pwd" show-overflow-tooltip label="个税申报密码" align="center" min-width="150" />
        <el-table-column prop="taxpayer_name" show-overflow-tooltip label="办税人姓名" align="center" min-width="120" />
        <el-table-column prop="taxpayer_pwd" show-overflow-tooltip label="办税人员密码" align="center" min-width="150" />
        <el-table-column
          prop="legal_person_id_card" show-overflow-tooltip label="法人身份证" align="center"
          min-width="180"
        />
        <el-table-column prop="legal_person_phone" show-overflow-tooltip label="法人手机号" align="center" min-width="150" />
        <el-table-column
          prop="add_time" show-overflow-tooltip label="添加时间" align="center" min-width="180"
          :formatter="(row, column, cellValue, index) => timeStampToDate(cellValue * 1000)"
        />
        <el-table-column prop="mark" show-overflow-tooltip label="备注" align="center" min-width="120" />
        <el-table-column label="操作" fixed="right" header-align="center" min-width="200">
          <template #default="scope">
            <div class="w-full flex items-center justify-center">
              <el-popconfirm
                v-if="scope.row.status === 0" title="确定申报此公司?"
                @confirm="handleChangeDeclareStatus(scope.row.id, 1)"
              >
                <template #reference>
                  <el-button type="success" size="small">
                    新增申报
                  </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                v-if="scope.row.status === 1" title="确定停止申报此公司?"
                @confirm="handleChangeDeclareStatus(scope.row.id, 0)"
              >
                <template #reference>
                  <el-button type="warning" size="small">
                    停止申报
                  </el-button>
                </template>
              </el-popconfirm>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-button type="primary" size="small" ml-12px>
                    更多
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </el-button>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>修改</el-dropdown-item>
                    <el-dropdown-item @click="handleDeleteCompany(scope.row.company_name, scope.row.id)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
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
