<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { addCompany, editCompany } from '~/api/modules/company'
import { getClientList } from '~/api/modules/client'
const emit = defineEmits(['submit'])
const dialogVisible = ref(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm: Company = reactive({
  id: '',
  uid: '',
  customer_phone: '',
  company_name: '',
  national_tax_pwd: '',
  personal_tax_pwd: '',
  taxpayer_name: '',
  taxpayer_pwd: '',
  legal_person_id_card: '',
  legal_person_phone: '',
  note: '',
})

const rules = reactive<FormRules>({
  uid: [
    { required: true, message: '请输入客户手机号', trigger: 'change' },
  ],
  company_name: [
    { required: true, message: '请输入企业名称', trigger: 'blur' },
  ],
  national_tax_pwd: [
    { required: true, message: '请输入国税密码', trigger: 'blur' },
  ],
  personal_tax_pwd: [
    { required: true, message: '请输入个税申报密码', trigger: 'blur' },
  ],
  taxpayer_name: [
    { required: true, message: '请输入办税人姓名', trigger: 'blur' },
  ],
  taxpayer_pwd: [
    { required: true, message: '请输入办税人身份证', trigger: 'blur' },
  ],
  legal_person_id_card: [
    { required: true, message: '请输入法人身份证', trigger: 'blur' },
  ],
  legal_person_phone: [
    { required: true, message: '请输入法人手机号', trigger: 'blur' },
  ],
})

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

/**
 * @description: 打开弹窗
 * @return {*}
 */
const type = ref(false)
const openDialog = (flag: boolean, row?: Company) => {
  type.value = flag
  if (flag) {
    ruleForm.id = row!.id
    ruleForm.uid = row!.uid
    ruleForm.customer_phone = row!.customer_phone
    ruleForm.company_name = row!.company_name
    ruleForm.national_tax_pwd = row!.national_tax_pwd
    ruleForm.personal_tax_pwd = row!.personal_tax_pwd
    ruleForm.taxpayer_name = row!.taxpayer_name
    ruleForm.taxpayer_pwd = row!.taxpayer_pwd
    ruleForm.legal_person_id_card = row!.legal_person_id_card
    ruleForm.legal_person_phone = row!.legal_person_phone
    ruleForm.note = row!.note
    remoteMethod(ruleForm.customer_phone)
  }

  dialogVisible.value = true
}
defineExpose({
  openDialog,
})

/**
 * @description: 监听关闭弹窗
 * @return {*}
 */
watch(dialogVisible, (val: boolean) => {
  if (!val) {
    ruleFormRef.value!.resetFields()
    ruleForm.id = ''
    ruleForm.uid = ''
    ruleForm.customer_phone = ''
    ruleForm.company_name = ''
    ruleForm.national_tax_pwd = ''
    ruleForm.personal_tax_pwd = ''
    ruleForm.taxpayer_name = ''
    ruleForm.taxpayer_pwd = ''
    ruleForm.legal_person_id_card = ''
    ruleForm.legal_person_phone = ''
    ruleForm.note = ''
    customerOptions.value = []
  }
})
/**
 * @description: 提交表单
 * @return {*}
 */
const loading = ref(false)
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        if (type.value)
          await editCompany(ruleForm)

        else
          await addCompany(ruleForm)

        emit('submit')
        dialogVisible.value = false
        ElMessage.success('提交成功')
        loading.value = false
      }
      catch (e: any) {
        loading.value = false
        ElMessage.error(e.msg || e.message || '提交失败')
      }
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="type ? '编辑公司' : '新增公司'" width="600px" destroy-on-close :show-close="false">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="right" label-width="120px" w-500px ma>
      <el-form-item label="客户手机号" prop="uid">
        <el-select
          v-model="ruleForm.uid" filterable remote placeholder="请输入客户手机号" :remote-method="remoteMethod"
          :loading="selectLoading"
          fit-input-width
          w-full
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
      </el-form-item>
      <el-form-item label="企业名称" prop="company_name">
        <el-input v-model="ruleForm.company_name" clearable placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="国税密码" prop="national_tax_pwd">
        <el-input
          v-model="ruleForm.national_tax_pwd" type="password" show-password clearable placeholder="请输入国税密码"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="个税申报密码" prop="personal_tax_pwd">
        <el-input
          v-model="ruleForm.personal_tax_pwd" type="password" show-password clearable placeholder="请输入个税申报密码"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="办税人姓名" prop="taxpayer_name">
        <el-input v-model="ruleForm.taxpayer_name" clearable placeholder="请输入办税人姓名" />
      </el-form-item>
      <el-form-item label="办税人身份证" prop="taxpayer_pwd">
        <el-input v-model="ruleForm.taxpayer_pwd" clearable placeholder="请输入办税人身份证" />
      </el-form-item>
      <el-form-item label="法人身份证" prop="legal_person_id_card">
        <el-input v-model="ruleForm.legal_person_id_card" clearable placeholder="请输入法人身份证" />
      </el-form-item>
      <el-form-item label="法人手机号" prop="legal_person_phone">
        <el-input v-model="ruleForm.legal_person_phone" clearable placeholder="请输入法人手机号" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="ruleForm.note" type="textarea" clearable placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="loading" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" :disabled="loading" @click="handleSubmit(ruleFormRef)">确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
