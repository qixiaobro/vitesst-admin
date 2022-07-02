<script setup lang="ts">
interface Props {
  menuList: Menu.MenuOptions[] | []
  parentPath?: string
}
const props = withDefaults(defineProps<Props>(), {
  menuList: () => [],
  parentPath: '',
})
const generatePath = (path: string) => {
  if (props.parentPath !== '')
    return `${props.parentPath}/${path}`

  return path
}
function renderIcon(icon: string) {
  return () => h(Icon, { icon, class: 'text-18px' })
}
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="generatePath(subItem.path)">
      <template #title>
        <el-icon>
          <component :is="renderIcon(subItem.meta.icon)" />
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubItem :menu-list="subItem.children" :parent-path="generatePath(subItem.path)" />
    </el-sub-menu>
    <el-menu-item v-else :index="generatePath(subItem.path)">
      <el-icon>
        <component :is="renderIcon(subItem.meta.icon)" />
      </el-icon>
      <template v-if="subItem.meta?.href" #title>
        <a class="href" :href="subItem.meta.href" target="_blank">{{ subItem.meta.title }}</a>
      </template>
      <template v-else #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
