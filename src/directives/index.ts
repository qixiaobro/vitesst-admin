import type { App } from 'vue'
import setupPermissionDirective from './permission'

/** setup custom vue directives. - [安装自定义的vue指令] */
export function setupDirectives(app: App) {
  setupPermissionDirective(app)
}
