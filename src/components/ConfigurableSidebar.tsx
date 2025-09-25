import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { Environment, Supplier } from '../config/sidebarConfig'
import type { SidebarConfig } from '../types/sidebar'
import { getEnvironmentClass } from '../utils/styleUtils'
import ConfigSwitcher from './sidebar/ConfigSwitcher'
import IconMenuItem from './sidebar/IconMenuItem'
import SidebarCollapseToggle from './sidebar/SidebarCollapseToggle'
import SidebarGroup from './sidebar/SidebarGroup'
import SidebarItemComponent from './sidebar/SidebarItem'
import SidebarUserInfo from './sidebar/SidebarUserInfo'

interface ConfigurableSidebarProps {
  config: SidebarConfig
  currentSupplier: Supplier
  currentEnvironment: Environment
  onSupplierChange: (supplier: Supplier) => void
  onEnvironmentChange: (environment: Environment) => void
}

export function ConfigurableSidebar({ config,
  currentSupplier,
  currentEnvironment,
  onSupplierChange,
  onEnvironmentChange
}: ConfigurableSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  // 检查菜单项是否为当前活动项
  const isItemActive = (href?: string) => {
    if (!href) return false
    // 对于根路径，需要精确匹配
    if (href === '/') return location.pathname === href
    // 对于其他路径，检查路径是否以href开头
    return location.pathname.startsWith(href)
  }
  return (
    <div className={`flex h-screen flex-col border-e border-gray-100 bg-white transition-all duration-300 relative ${isCollapsed ? 'w-16' : 'w-1/8'}`}>
      {/* 环境主题样式 */}
      <div className={`absolute inset-0 pointer-events-none ${getEnvironmentClass(currentEnvironment, 'background')} ${getEnvironmentClass(currentEnvironment, 'border')} transition-colors duration-300 z-0`}></div>

      {/* 生产环境提示条 */}
      <div className={`absolute top-0 left-0 right-0 h-2 ${getEnvironmentClass(currentEnvironment, 'topBackground')} z-20`}></div>

      {/* 主要内容区域 */}
      {!isCollapsed && (
        <>
          {/* 菜单项区域 */}
          <div className="flex-1 overflow-auto z-10">
            <div className="px-4 py-6">
              {/* Logo */}
              {config.logo && (
                <span
                  className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 cursor-pointer"
                  onClick={config.logo.onClick}
                >
                  {config.logo.text}
                </span>
              )}

              {/* Menu Items */}
              <ul className="mt-6 space-y-1">
                {config.items.map(item => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <SidebarGroup
                        key={item.id}
                        item={item}
                        isExpanded={expandedGroups.includes(item.id)}
                        onToggle={toggleGroup}
                        isItemActive={isItemActive}
                      />
                    )
                  }
                  return (
                    <SidebarItemComponent
                      key={item.id}
                      item={item}
                      isActive={item.isActive || false || isItemActive(item.href)}
                    />
                  )
                })}
              </ul>
            </div>

            {/* 生产环境提示文字 */}
            {/* {currentEnvironment === 'production' && (
              <div className="px-4 py-2 text-center text-xs font-semibold text-blue-500 bg-blue-50">
                当前处于生产环境
              </div>
            )} */}
          </div>

          {/* 底部控件区域 - 固定在底部 */}
          <div className="z-10">
            {/* Config Switcher */}
            <ConfigSwitcher
              currentSupplier={currentSupplier}
              currentEnvironment={currentEnvironment}
              onSupplierChange={onSupplierChange}
              onEnvironmentChange={onEnvironmentChange}
            />

            {/* User Info */}
            {config.userInfo && (
              <SidebarUserInfo userInfo={config.userInfo} />
            )}
          </div>
        </>
      )}

      {/* Collapsed View - Icons Only */}
      {isCollapsed && (
        <div className="flex flex-col items-center py-6 px-1 w-full z-10">
          {/* Logo (icon only) */}
          {config.logo && (
            <div className="mb-6 text-center" onClick={config.logo.onClick}>
              <svg className={`size-6 ${getEnvironmentClass(currentEnvironment, 'icon')}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          )}

          {/* Menu Icons Only */}
          <div className="space-y-3">
            {config.items.map(item => (
              <IconMenuItem
                key={item.id}
                item={item}
                isActive={item.isActive || false || isItemActive(item.href)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 全局的 Collapse Toggle Button - 始终显示 */}
      <SidebarCollapseToggle
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        currentEnvironment={currentEnvironment}
      />
    </div>
  )
}