import type { App, Directive } from 'vue'

const hasPermission = (permissions: string[], role: string[]): boolean => {
  if (permissions.length === 0)
    return true

  // 判断permissions是否包含role中的任何一个
  return permissions.some(item => role.includes(item))
}

export default function setupPermissionDirective(app: App) {
  function updateElVisible(el: HTMLElement, permission: []) {
    const role = sessionStorage.getItem('role') ? JSON.parse(sessionStorage.getItem('role')!) : []

    if (!permission)
      throw new Error('need roles: like v-permission="\'admin\'", v-permission="[\'admin\', \'test]"')

    if (!hasPermission(permission, role))
      el.parentElement?.removeChild(el)
  }

  const permissionDirective: Directive<HTMLElement, []> = {
    mounted(el, binding) {
      updateElVisible(el, binding.value)
    },
    beforeUpdate(el, binding) {
      updateElVisible(el, binding.value)
    },
  }

  app.directive('permission', permissionDirective)
}
