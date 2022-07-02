<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import { UseMenuStore } from '~/store/modules/menu'
import { UseTabsStore } from '~/store/modules/tabs'

const menuStore = UseMenuStore()
const tabStore = UseTabsStore()

const isCollapse = computed((): boolean => menuStore.isCollapse)
const router = useRouter()

// logout
const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    sessionStorage.clear()
    ElMessage({
      type: 'success',
      message: '退出登录成功！',
    })
    router.push('/login')
    tabStore.$reset()
    menuStore.$reset()
    window.location.reload()
  })
}
</script>

<template>
  <div h-60px px-15px flex items-center justify-between border-b border-gray-200>
    <div flex items-center>
      <div
        text-gray-400 p-4px flex items-center justify-center bg-gray-100 rounded-sm cursor-pointer
        hover:text-blue-400 hover:bg-gray-200 mr-5 @click="menuStore.setCollapse()"
      >
        <div :class="isCollapse ? 'i-ep-expand' : 'i-ep-fold'" text-16px />
      </div>
      <Breadcrumb />
    </div>
    <div flex items-center>
      <!-- username -->
      <span text-14px text-gray-500 mr-2 />
      <!-- usercenter -->
      <el-dropdown trigger="click">
        <div w-40px h-40px i-carbon-user-avatar-filled />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
