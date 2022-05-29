<script lang="ts" setup>
import type { UploadFile, UploadProps, UploadUserFile } from 'element-plus'
import { getUploadFileToken } from '~/api/modules/common'
import { declare, updateDeclareRecord } from '~/api/modules/declare'

const emit = defineEmits(['submit'])
const dialogVisible = ref(false)

const editType = ref('add')

/**
 * @description: 打开弹窗
 * @return {*}
 */
const fileList = ref<UploadUserFile[]>([])

const companyInfo = ref<{ id: number; [key: string]: any }>({ id: 0 })
const openDialog = (row: any, type = 'add') => {
  companyInfo.value = row
  if (type === 'edit') {
    editType.value = 'edit'
    row.img_url.forEach((item: any, index: number) => {
      const file: UploadFile = {
        uid: index,
        name: item,
        url: item,
        status: 'success',
      }
      fileList.value.push(file)
    })
  }
  dialogVisible.value = true
}
defineExpose({
  openDialog,
})

/**
 * @description: 获取token
 * @return {*}
 */
const domin = ref('')
const token = reactive({
  token: '',
})
const key = ref('')
const getToken = async () => {
  try {
    const res = await getUploadFileToken()
    domin.value = res.domain
    token.token = res.token
    key.value = res.key
  }
  catch {
    ElMessage.error('获取上传文件token失败')
  }
}

onMounted(() => {
  getToken()
})

const dialogImageUrl = ref('')

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

/**
 * @description: 保存
 * @return {*}
 */
const loading = ref(false)
const handleSubmit = async () => {
  const fileListUrl = ref<string[]>([])
  fileList.value.forEach((item: UploadUserFile) => {
    if (item.response) {
      const url: any = `${domin.value}/${(item.response as any).key}`
      fileListUrl.value.push(url)
    }
    else {
      fileListUrl.value.push((item.url as string))
    }
  })
  if (fileListUrl.value.length === 0) {
    ElMessage.error('请上传文件')
  }
  else {
    if (editType.value === 'add') {
      try {
        loading.value = true
        await declare({
          company_id: companyInfo.value!.id,
          imgs: fileListUrl.value,
        })
        ElMessage.success('保存成功')
        emit('submit')
        dialogVisible.value = false
        loading.value = false
      }
      catch {
        ElMessage.error('保存失败')
        loading.value = false
      }
    }
    else {
      try {
        loading.value = true
        await updateDeclareRecord({
          id: companyInfo.value!.id,
          imgs: fileListUrl.value,
        })
        ElMessage.success('保存成功')
        emit('submit')
        dialogVisible.value = false
        loading.value = false
      }
      catch {
        ElMessage.error('保存失败')
        loading.value = false
      }
    }
  }
}

/**
 * @description: 监听弹窗关闭
 * @return {*}
 */
watch(dialogVisible, (val) => {
  if (!val) {
    fileList.value = []
    companyInfo.value = { id: 0 }
    editType.value = 'add'
  }
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传申报记录" width="600px" destroy-on-close :show-close="false">
    <el-upload
      list-type="picture-card" multiple drag action="https://upload-z2.qiniup.com" :data="token" accept="image/*"
      :on-preview="handlePictureCardPreview" :file-list="fileList" class="customer-upload"
    >
      <el-icon>
        <Plus />
      </el-icon>
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
.customer-upload {
  :deep(.el-upload-dragger) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
