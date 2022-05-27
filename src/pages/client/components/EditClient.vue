<script lang="ts" setup>
import { editClientApi } from '~/api/modules/client'
interface Props {
  id: number
  nickname: string
  avatar: string
  phone?: string
  realName: string
  mark: string
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  nickname: '',
  avatar: '',
  phone: '',
  realName: '',
  mark: '',
})

const emit = defineEmits(['submit'])

const dialogVisible = ref(false)
const loading = ref(false)
const form = reactive({
  real_name: '',
  mark: '',
})

/**
 * @description: 打开弹窗
 * @return {*}
 */
const openDialog = () => {
  dialogVisible.value = true
  nextTick(() => {
    form.real_name = props.realName
    form.mark = props.mark
  })
}

defineExpose({
  openDialog,
})

/**
 * @description: 提交编辑客户信息
 * @return {*}
 */
const handleSubmit = async () => {
  try {
    loading.value = true
    await editClientApi({ id: props.id, ...form })
    dialogVisible.value = false
    loading.value = false
    ElMessage.success('编辑成功')
    emit('submit')
  }
  catch (e: any) {
    loading.value = false
    ElMessage.error(e.msg || e.message || '编辑失败')
  }
}

</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑客户信息" width="700px" destroy-on-close :show-close="false">
    <el-form :model="form" label-position="right" label-width="100px" w-500px ma>
      <el-form-item label="客户基础信息">
        <el-avatar mx-1 :src="props.avatar" /> <span mx-1 text-gray-900>{{ props.nickname }}</span> <span mx-1 text-gray-400>{{ props.phone }}</span>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.real_name" placeholder="请输入客户真实姓名（没有可不填）" clearable />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.mark" placeholder="请输入客户备注" type="textarea" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" :disabled="loading" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
