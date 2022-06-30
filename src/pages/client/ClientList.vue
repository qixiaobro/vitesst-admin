<!--
 * @Author: qixiaobro
 * @Date: 2022-05-08 22:16:11
 * @LastEditors: qixiaobro
 * @LastEditTime: 2022-06-30 23:19:26
 * @Description: 用户列表
 * Copyright (c) 2022 by qixiaobro, All Rights Reserved.
-->
<script lang="ts" setup name="clientList">
import EditClient from './components/EditClient.vue'
import type Recharge from './components/Recharge.vue'
import RechargeVue from './components/Recharge.vue'

const { useTimeStampToDate } = useTimeFormat()

const tableHeight = ref('auto')
onMounted(() => {
  tableHeight.value = `${window.innerHeight - 430}px`
})
const options = [
  {
    value: 'phone',
    label: '客户手机号',
  },
  {
    value: 'account',
    label: '客户昵称',
  },
  {
    value: 'spread_phone',
    label: '邀请人手机号',
  },
  {
    value: 'spread_name',
    label: '邀请人昵称',
  },
  {
    value: 'remark',
    label: '备注',
  },
]

const { tableData, loading, pageable, searchParam, search, getTableList, reset, handleSizeChange, handleCurrentChange } = useTable(getClientListApi)

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
 * @description: 查看余额变动记录
 * @return {*}
 */
const router = useRouter()
const handleBalanceLog = (phone: string) => {
  router.push({
    path: '/client/balanceLog',
    query: {
      phone,
    },
  })
}

/**
 * @description: 重置时间
 * @return {*}
 */
const resetData = () => {
  data.value = []
}

/**
 * @description: 编辑客户信息
 * @return {*}
 */
const clientInfo = ref({
  uid: 0,
  nickname: '',
  avatar: '',
  phone: '',
  real_name: '',
  mark: '',
})
const editClientRef = ref<InstanceType<typeof EditClient> | null>(null)
const handleEditClientInfo = (row: any) => {
  clientInfo.value = row
  editClientRef.value?.openDialog()
}

/**
 * @description: 充值
 * @return {*}
 */
const rechargeRef = ref<InstanceType<typeof Recharge> | null>(null)
const handleRecharge = (row: any) => {
  rechargeRef.value?.openDialog({
    phone: row.phone, nickname: row.nickname, avatar: row.avatar,
  })
}

/**
 * @description: 获取客户列表统计数据
 * @return {*}
 */
const totalClient = ref(0)
const totalMoney = ref(0)
const todayNewClient = ref(0)
const todayNewMoney = ref(0)
const getClientCountData = async () => {
  try {
    const { data } = await getClientStatisticsApi()
    totalClient.value = data[0].count
    totalMoney.value = data[1].count
    todayNewClient.value = data[2].count
    todayNewMoney.value = data[3].count
  }
  catch (e: any) {
    ElMessage.error(e.msg || e.message || '获取统计数据失败')
  }
}

onActivated(() => {
  getTableList()
  getClientCountData()
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <DataCard color="indigo-600" title="用户总数（人）" :num="totalClient" icon="i-carbon:user-activity" />
    </el-col>
    <el-col :span="6">
      <DataCard color="pink-600" title="充值总金额（元）" :num="totalMoney" icon="i-carbon:currency-dollar" />
    </el-col>
    <el-col :span="6">
      <DataCard color="purple-600" title="今日新增客户（人）" :num="todayNewClient" icon="i-carbon:user-follow" />
    </el-col>
    <el-col :span="6">
      <DataCard color="yellow-600" title="今日充值金额（元）" :num="todayNewMoney" icon="i-carbon:currency" />
    </el-col>
  </el-row>
  <div class="w-full rounded shadow-xl bg-white mt-5 p-5 box-border">
    <!-- 搜索表单 -->
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
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="search">
          查询
        </el-button>
        <el-button type="primary" plain auto-insert-space @click="() => { reset(); resetData() }">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表格 -->
    <div class="data-table w-full">
      <el-table
        v-loading="loading" w-full :data="tableData" stripe size="large" highlight-current-row
        style="width: 100%" header-cell-class-name="header-style" empty-text="暂无数据" :max-height="tableHeight"
      >
        <el-table-column prop="nickname" label="昵称" show-overflow-tooltip min-width="120" />
        <el-table-column prop="phone" label="手机号" min-width="120" align="center" />
        <el-table-column prop="avatar" label="头像" show-overflow-tooltip width="140" align="center">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="real_name" label="真实姓名" min-width="120" align="center" />
        <el-table-column prop="company_count" label="公司数（家）" min-width="120" align="center" />
        <el-table-column prop="now_money" label="余额（元）" min-width="120" align="center" />
        <el-table-column prop="spread_phone" label="邀请人" min-width="120" align="center" />
        <el-table-column
          prop="add_time" label="注册时间" min-width="180" align="center"
          :formatter="(row, column, cellValue, index) => useTimeStampToDate(cellValue * 1000)"
        />
        <el-table-column prop="mark" label="备注" show-overflow-tooltip min-width="120" />
        <el-table-column label="操作" fixed="right" align="center" min-width="250">
          <template #default="scope">
            <el-button size="small" type="primary" auto-insert-space @click="handleRecharge(scope.row)">
              充值
            </el-button>
            <el-button size="small" type="primary" plain auto-insert-space @click="handleEditClientInfo(scope.row)">
              编辑
            </el-button>
            <el-button size="small" link type="primary" @click="handleBalanceLog(scope.row.phone)">
              余额变动记录
            </el-button>
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

  <!-- 编辑客户信息弹窗 -->
  <EditClient
    :id="clientInfo.uid" ref="editClientRef" :nickname="clientInfo.nickname" :avatar="clientInfo.avatar"
    :phone="clientInfo.phone" :real-name="clientInfo.real_name" :mark="clientInfo.mark" @submit="getTableList"
  />

  <!-- 充值弹窗 -->
  <RechargeVue ref="rechargeRef" @submit="getTableList" />
</template>

<style lang="scss" scoped>
.header-style {
  background: red;
}
</style>
