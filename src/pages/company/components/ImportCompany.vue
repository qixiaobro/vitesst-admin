<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import { getClientList } from '~/api/modules/client'
import { importCompany } from '~/api/modules/company'
const emit = defineEmits(['submit'])
const dialogVisible = ref(false)

const uid = ref()

/**
 * @description: 搜索客户
 * @return {*}
 */
interface ListItem {
  value: string
  label: string
  nickname: string
  [key: string]: any
}
const customerOptions = ref<ListItem[]>([])
const selectLoading = ref(false)
const remoteMethod = async (query: string) => {
  if (query) {
    selectLoading.value = true
    try {
      const res = await getClientList({
        field_name: 'phone',
        field_value: query,
      })
      selectLoading.value = false
      res.list.forEach((item: ListItem) => {
        customerOptions.value.push({
          value: item.uid,
          label: item.phone,
          nickname: item.nickname,
        })
      })
    }
    catch {
      selectLoading.value = false
    }
  }
  else {
    customerOptions.value = []
  }
}

const fileList = ref<UploadUserFile[]>([])

/**
 * @description: 提交表单
 * @return {*}
 */
const loading = ref(false)
const handleSubmit = async () => {
  if (!uid.value) {
    ElMessage.warning('请先选择客户')
    return
  }

  if (!fileList.value.length) {
    ElMessage.warning('请先上传文件')
    return
  }

  try {
    loading.value = true
    const formData = new FormData()
    formData.append('uid', uid.value)
    formData.append('file', (fileList.value[0].raw as Blob))
    await importCompany(formData)
    dialogVisible.value = false
    ElMessage.success('导入成功')
    emit('submit')
    loading.value = false
  }
  catch (err: any) {
    ElMessage.error(err.msg || err.message)
    loading.value = false
  }
}

/**
 * @description: 打开弹窗
 * @return {*}
 */
const openDialog = () => {
  dialogVisible.value = true
}
defineExpose({
  openDialog,
})

watch(dialogVisible, (val: boolean) => {
  if (!val) {
    uid.value = ''
    fileList.value = []
  }
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="导入公司" width="600px" destroy-on-close :show-close="false">
    <div>
      1. 请先下载导入模版，将要导入的公司填到模版中
    </div>
    <div mt-5>
      2. 选择归属客户
    </div>
    <el-select
      v-model="uid" mt-5 la filterable remote placeholder="请输入客户手机号" :remote-method="remoteMethod"
      :loading="selectLoading" fit-input-width w-full
    >
      <el-option v-for="item in customerOptions" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span
          style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
        >{{ item.nickname }}</span>
      </el-option>
    </el-select>
    <div mt-5>
      3. 讲完善好的模版文件上传：
    </div>
    <el-upload mt-5 drag action="#" accept=".xls, .xlsx, .csv" :auto-upload="false" :limit="1" :file-list="fileList">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        拖拽文件到此处或者<em>点击此处选择文件</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          请选择xlsx文件
        </div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" :disabled="loading" @click="handleSubmit()">确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
