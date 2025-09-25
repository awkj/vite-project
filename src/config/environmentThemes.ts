/**
 * 环境主题配置
 * 集中管理不同环境的样式类
 */

/**
 * 环境主题类型定义
 */
export interface EnvironmentTheme {
  // 背景色相关样式
  background: string
  // 顶部背景色相关样式
  topBackground: string
  // 边框色相关样式
  border: string
  // 文字颜色相关样式
  text: string
  // 图标颜色相关样式
  icon: string
  // 按钮相关样式
  button: string
}

/**
 * 不同环境的主题配置
 */
export const environmentThemes: Record<string, EnvironmentTheme> = {
  production: {
    background: 'bg-blue-100',
    topBackground: 'bg-blue-600',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-500',
    button: 'bg-blue-500 hover:bg-blue-600',
  },
  test: {
    background: 'bg-violet-100',
    topBackground: 'bg-violet-600',
    border: 'border-violet-200',
    text: 'text-violet-700',
    icon: 'text-violet-500',
    button: 'bg-violet-500 hover:bg-violet-600',
  },
}

/**
 * 获取指定环境的主题
 * @param environment 环境名称
 * @returns 主题配置
 */
export function getThemeByEnvironment(environment: string): EnvironmentTheme {
  return environmentThemes[environment] || environmentThemes.test
}

/**
 * 获取指定环境的指定样式属性
 * @param environment 环境名称
 * @param property 样式属性名称
 * @returns 样式类名
 */
export function getThemeProperty(environment: string, property: keyof EnvironmentTheme): string {
  const theme = getThemeByEnvironment(environment)
  return theme[property]
}