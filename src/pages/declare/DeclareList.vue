<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-05-29 12:26:37
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import DeclareDetailVue from './components/DeclareDetail.vue'
import type DeclareDetail from './components/DeclareDetail.vue'
import { useTable } from '~/composables/useTable'
import { getDeclareList } from '~/api/modules/declare'
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

const { tableData, loading, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } = useTable(getDeclareList)

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

/**
 * @description: 查看新增/停止申报列表
 * @return {*}
 */
const router = useRouter()
const checkDeclareChange = (flag: number) => {
  if (flag) {
    router.push({
      path: `/declare/newDeclare/${flag}`,
    })
  }
  else {
    router.push({
      path: `/declare/stopDeclare/${flag}`,
    })
  }
}

/**
 * @description: 导出申报列表
 * @return {*}
 */
const exportLoading = ref(false)
const handleExport = async () => {
  try {
    exportLoading.value = true
    const res = await getDeclareList({ is_excel: 1 })
    window.open(res.url[0], '_blank')
    exportLoading.value = false
    ElMessage.success('导出成功')
  }
  catch (err: any) {
    exportLoading.value = false
    ElMessage.error(err.msg || err.message)
  }
}

/**
 * @description: 打开弹窗上传申报记录
 * @return {*}
 */
const declareDetailRef = ref<InstanceType<typeof DeclareDetail> | null>(null)
const handleDeclare = (row: any) => {
  declareDetailRef?.value?.openDialog(row)
}

onMounted(() => {
  tableHeight.value = `${window.innerHeight - 430}px`
})

onActivated(() => {
  getTableList()
})

</script>
<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <DataCard
        color="green-600" title="新增申报公司（家）" num="30000" icon="i-carbon:document-add" detail
        @click="checkDeclareChange(1)"
      />
    </el-col>
    <el-col :span="6">
      <DataCard
        color="red-600" title="停止申报公司（家）" num="30000" icon="i-carbon:document-download" detail
        @click="checkDeclareChange(0)"
      />
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
      <el-form-item label="添加时间" prop="data">
        <el-date-picker
          v-model="data" type="daterange" range-separator="-" start-placeholder="开始时间"
          value-format="YYYY/MM/DD" end-placeholder="结束时间" clearable style="width:250px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="search">
          查询
        </el-button>
        <el-button type="primary" plain auto-insert-space @click="() => { reset(); resetData() }">
          重置
        </el-button>
        <el-button
          type="success" plain auto-insert-space :loading="exportLoading" :disabled="exportLoading"
          @click="handleExport"
        >
          导出申报列表
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
            <div class="w-full flex items-center justify-center" @click="handleDeclare(scope.row)">
              <el-button type="success" size="small">
                上传申报记录
              </el-button>
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

  <!--添加申报记录弹窗-->
  <DeclareDetailVue ref="declareDetailRef" @submit="getTableList" />
</template>
<style lang="scss" scoped>
.header-style {
  background: red;
}
</style>
