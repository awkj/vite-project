import { getThemeProperty } from '../config/environmentThemes'
import type { Environment } from '../config/sidebarConfig'

/**
 * 根据当前环境返回对应的样式类
 * @param currentEnvironment 当前环境
 * @param property 样式属性名称
 * @returns 根据环境选择的样式类
 */
export function envClass(
  currentEnvironment: Environment,
  property: string
): string {
  return getThemeProperty(currentEnvironment, property as any)
}

/**
 * 根据布尔值返回对应的样式类
 * @param condition 条件布尔值
 * @param trueClass 条件为真时的样式类
 * @param falseClass 条件为假时的样式类
 * @returns 根据条件选择的样式类
 */
export function getConditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass: string
): string {
  return condition ? trueClass : falseClass
}

/**
 * 根据状态返回对应的徽章样式类
 * @param status 状态字符串
 * @returns 徽章样式类
 */
export function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'success':
    case 'enabled':
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'failed':
    case 'disabled':
    case 'overdue':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * 根据侧边栏展开状态返回对应的样式类
 * @param isCollapsed 侧边栏是否折叠
 * @param collapsedClass 折叠时的样式类
 * @param expandedClass 展开时的样式类
 * @returns 根据展开状态选择的样式类
 */
export function getSidebarClass(
  isCollapsed: boolean,
  collapsedClass: string,
  expandedClass: string
): string {
  return isCollapsed ? collapsedClass : expandedClass
}