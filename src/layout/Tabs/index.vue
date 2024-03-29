<script setup lang="ts">
import type { TabPanelName, TabsPaneContext } from 'element-plus'

const tabStore = UseTabsStore()
const tabsMenuList = computed(() => tabStore.tabsMenuList)
const tabsMenuValue = computed({
  get: () => {
    return tabStore.tabsMenuValue
  },
  set: (val) => {
    tabStore.setTabsMenuValue(val)
  },
})

const route = useRoute()
const router = useRouter()
// 监听路由的变化（防止后退前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    const params: Menu.TabOptions = {
      title: route.meta.title,
      path: route.path,
      fullPath: route.fullPath,
      icon: route.meta.icon,
      close: true,
    }
    tabStore.addTabs(params)
  },
  {
    immediate: true,
  },
)

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const path = tabItem.props.name as string
  router.push(path)
}

// Remove Tab
const removeTab = (targetName: TabPanelName | undefined, action: 'remove' | 'add') => {
  if (action === 'remove')
    tabStore.removeTabs(targetName as string)
}

// Close Current
const closeCurrentTab = () => {
  if (tabStore.tabsMenuValue === '/')
    return
  tabStore.removeTabs(tabStore.tabsMenuValue)
}

// Close Other
const closeOtherTab = () => {
  tabStore.closeMultipleTab(tabStore.tabsMenuValue)
}

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab()
  tabStore.goHome()
}
</script>

<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @edit="removeTab">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.fullPath"
          :path="item.fullPath"
          :label="item.title"
          :name="item.fullPath"
          :closable="item.close"
        >
          <template #label>
            <el-icon v-if="item.icon" class="tabs-icon">
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-dropdown trigger="click">
        <el-button size="small" type="primary">
          <span>更多</span>
          <i-ep-arrow-down />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentTab">
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherTab">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllTab">
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
