<script setup lang="ts">
defineProps<{ menuList: Menu.MenuOptions[] }>()

const onlyOneChild = ref<any>()
function hasOneShowingChild(children: Menu.MenuOptions[] = [], parent: Menu.MenuOptions) {
  const showingChildren = children.filter((item) => {
    if (item.meta.hidden) {
      return false
    }
    else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1)
    return true

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
}
function resolvePath(item: Menu.MenuOptions) {
  return item.redirect || item.path
}

</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.id">
    <el-menu-item
      v-if="hasOneShowingChild(subItem.children, subItem) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)&& !subItem.meta.hidden"
      :index="resolvePath(subItem)"
    >
      <el-icon>
        <component :is="subItem.meta.icon" />
      </el-icon>
      <template v-if="!subItem.isLink" #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <template v-else #title>
        <a class="href" :href="subItem.isLink" target="_blank">{{ subItem.meta.title }}</a>
      </template>
    </el-menu-item>
    <el-sub-menu v-else-if="!subItem.meta.hidden" :index="subItem.path">
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon" />
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubItem :menu-list="subItem.children!" />
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
