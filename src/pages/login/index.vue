<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const menuStore = UseMenuStore()
const router = useRouter()

const captcha = ref('')

const loginFormRef = ref<FormInstance>()
const loginRules = reactive<FormRules>({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  imgCode: [{ required: true, message: '请输入图像验证码', trigger: 'blur' }],
})

// 登录表单数据
const loginForm = reactive({
  account: '',
  pwd: '',
  imgCode: '',
})

const imgLoading = ref(false)
const getCaptcha = async () => {
  if (imgLoading.value)
    return
  imgLoading.value = true
  const res = await getBlobCaptchaApi()
  captcha.value = window.URL.createObjectURL(res as unknown as Blob)
  imgLoading.value = false
}

onMounted(() => {
  getCaptcha()
})

const loading = ref(false)
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.validate(async (valid) => {
    if (!valid)
      return
    try {
      loading.value = true
      const { data } = await userLoginApi({
        account: loginForm.account,
        pwd: loginForm.pwd,
        imgCode: loginForm.imgCode,
      })
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('role', JSON.stringify(['admin']))
      menuStore.setMenuList(generateMenu(routes))
      ElMessage.success('登录成功')
      loading.value = false
      router.push('/')
    }
    catch {
      loading.value = false
      getCaptcha()
    }
  })
}
</script>

<template>
  <div class="page-login" flex items-center justify-center>
    <div class="p-6 sm:p-12" bg-white rounded>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl xl:text-3xl font-extrabold">
          用户登录
        </h1>
        <div class="w-full flex-1 mt-6">
          <div class="mx-auto max-w-xs">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
              <el-form-item prop="account">
                <el-input v-model="loginForm.account" placeholder="用户名">
                  <template #prefix>
                    <el-icon class="el-input__icon">
                      <user />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input v-model="loginForm.pwd" type="password" show-password placeholder="密码" @keyup.enter="handleLogin(loginFormRef)">
                  <template #prefix>
                    <el-icon class="el-input__icon">
                      <lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="imgCode">
                <el-input v-model="loginForm.imgCode" placeholder="图形验证码" style="width:218px" @keyup.enter="handleLogin(loginFormRef)">
                  <template #prefix>
                    <el-icon class="el-input__icon">
                      <Picture />
                    </el-icon>
                  </template>
                </el-input>
                <div w-100px h-38px border rounded border-gray-300 overflow-hidden>
                  <el-icon v-if="imgLoading" class="is-loading" color="#409EFF">
                    <Loading />
                  </el-icon>
                  <img v-else cursor-pointer :src="captcha" style="width: 100px; height: 38px" @click="getCaptcha">
                </div>
              </el-form-item>
            </el-form>
            <el-button
              w-320px mt-6 rounded size="large" type="primary" :loading="loading"
              @click="handleLogin(loginFormRef)"
            >
              登录
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-login {
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/images/login/bg.png');
  background-size: cover;
  background-position: center;
}
</style>
