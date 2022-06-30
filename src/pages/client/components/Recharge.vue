<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
const emit = defineEmits(['submit'])

const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  price: '',
  give_price: '',
  mark: '',
})
const rules = reactive<FormRules>({
  price: [
    { required: true, message: '请输入充值金额', trigger: 'blur' },
  ],
})

/**
 * @description: 打开弹窗
 * @return {*}
 */
const clientInfo = reactive({
  nickname: '',
  avatar: '',
  phone: '',
})
const openDialog = (row: { phone: string; nickname?: string; avatar?: string }) => {
  clientInfo.nickname = row.nickname || ''
  clientInfo.avatar = row.avatar || ''
  clientInfo.phone = row.phone
  dialogVisible.value = true
}
defineExpose({
  openDialog,
})

/**
 * @description: 监听关闭弹窗
 * @return {*}
 */
watch(dialogVisible, (val) => {
  if (!val) {
    ruleFormRef?.value?.resetFields()
    form.price = ''
    form.give_price = ''
    form.mark = ''
  }
})

/**
 * @description: 提交
 * @return {*}
 */
const loading = ref(false)
const handleSubmit = async () => {
  ruleFormRef?.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        await rechargeClientBalanceApi({
          phone: clientInfo.phone,
          price: form.price,
          give_price: form.give_price,
          mark: form.mark,
        })
        loading.value = false
        dialogVisible.value = false
        ElMessage.success('充值成功')
        emit('submit')
      }
      catch (err: any) {
        loading.value = false
        ElMessage.error(err.msg || err.message || '充值失败')
      }
    }
  })
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="余额充值" width="600px" destroy-on-close :show-close="false">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-position="right" label-width="100px" w-500px ma>
      <el-form-item label="客户基础信息">
        <el-avatar mx-1 :src="clientInfo.avatar" /> <span mx-1 text-gray-900>{{ clientInfo.nickname }}</span> <span
          mx-1
          text-gray-400
        >{{ clientInfo.phone }}</span>
      </el-form-item>
      <el-form-item label="充值金额" prop="price">
        <el-input v-model="form.price" placeholder="请输入充值金额" clearable type="number" />
      </el-form-item>
      <el-form-item label="赠送金额" prop="give_price">
        <el-input v-model="form.give_price" placeholder="请输入赠送金额（可不填）" clearable type="number" />
      </el-form-item>
      <el-form-item label="备注" prop="mark">
        <el-input v-model="form.mark" placeholder="请输入备注" type="textarea" clearable />
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
