import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { SidebarConfig, SidebarItem } from '../types/sidebar'

import type { Environment, Supplier } from '../config/sidebarConfig'

interface ConfigurableSidebarProps {
  config: SidebarConfig
  currentSupplier: Supplier
  currentEnvironment: Environment
  onSupplierChange: (supplier: Supplier) => void
  onEnvironmentChange: (environment: Environment) => void
}

export function ConfigurableSidebar({
  config,
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

  const renderSidebarItem = (item: SidebarItem) => {
    // 如果是有子项的分组
    if (item.children && item.children.length > 0) {
      const isExpanded = expandedGroups.includes(item.id)

      return (
        <li key={item.id}>
          <details
            className="group [&_summary::-webkit-details-marker]:hidden"
            open={isExpanded}
            onToggle={() => toggleGroup(item.id)}
          >
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center">
                {item.icon || (
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </div>

              <span className={`shrink-0 transition-all duration-300 ${isExpanded ? '-rotate-180' : ''}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul className="mt-2 space-y-1 px-4">
              {item.children.map(child => renderSidebarItem(child))}
            </ul>
          </details>
        </li>
      )
    }

              // 普通菜单项
    const itemIsActive = item.isActive || false || isItemActive(item.href)
    const baseClasses = 'flex items-center rounded-lg px-4 py-2 text-sm font-medium'
    const activeClasses = itemIsActive
      ? 'bg-blue-100 text-blue-700'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'

    // 根据是否有 href 或 onClick 来决定使用哪种元素
    if (item.href) {
      return (
        <li key={item.id}>
          <Link
            to={item.href}
            className={`${baseClasses} ${activeClasses}`}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault()
                item.onClick()
              }
            }}
          >
            {item.icon || (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            {item.label}
          </Link>
        </li>
      )
    } else if (item.onClick) {
      return (
        <li key={item.id}>
          <button
            className={`w-full text-left ${baseClasses} ${activeClasses}`}
            onClick={item.onClick}
          >
            {item.icon || (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            {item.label}
          </button>
        </li>
      )
    }

    return null
  }

  // 为折叠状态创建仅图标视图的菜单项
  const renderIconMenuItem = (item: SidebarItem) => {
    // 处理分组项
    if (item.children && item.children.length > 0) {
      // 在折叠状态下，不展开分组，只显示第一个子项或组图标
      const firstChild = item.children[0];
      return renderIconMenuItem(firstChild);
    }

    // 检查是否为活动项
    const itemIsActive = item.isActive || false || isItemActive(item.href);
    const baseClasses = 'flex items-center justify-center w-10 h-10 rounded-lg mx-auto';
    const activeClasses = itemIsActive ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100';

    // 根据是否有 href 或 onClick 来决定使用哪种元素
    if (item.href) {
      return (
        <li key={item.id} className="my-2">
          <Link
            to={item.href}
            className={`${baseClasses} ${activeClasses}`}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
            title={item.label}
          >
            {item.icon || (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </Link>
        </li>
      );
    } else if (item.onClick) {
      return (
        <li key={item.id} className="my-2">
          <button
            className={`${baseClasses} ${activeClasses}`}
            onClick={item.onClick}
            title={item.label}
          >
            {item.icon || (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </li>
      );
    }

    return null;
  };

  return (
      <div className={`flex h-screen flex-col border-e border-gray-100 bg-white transition-all duration-300 relative ${isCollapsed ? 'w-16' : 'w-1/8'}`}>
        {/* 环境主题样式 */}
        <div className={`absolute inset-0 pointer-events-none ${currentEnvironment === 'production' ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-100'} transition-colors duration-300 z-0`}></div>
        
        {/* 生产环境提示条 */}
        {currentEnvironment === 'production' && (
          <div className="absolute top-0 left-0 right-0 h-2 bg-red-500 z-20"></div>
        )}
        
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
                  {config.items.map(item => renderSidebarItem(item))}
                </ul>
              </div>

              {/* 生产环境提示文字 */}
              {currentEnvironment === 'production' && (
                <div className="px-4 py-2 text-center text-xs font-semibold text-red-500 bg-red-50">
                  当前处于生产环境
                </div>
              )}
            </div>

            {/* 底部控件区域 - 固定在底部 */}
            <div className="z-10">
              {/* Config Switcher */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1.5 text-gray-600">切换供应商</label>
                    <select
                      value={currentSupplier}
                      onChange={(e) => onSupplierChange(e.target.value as Supplier)}
                      className="w-full px-2 py-1 rounded border border-gray-300 text-xs transition-all"
                    >
                      <option value="alibaba">阿里巴巴</option>
                      <option value="tencent">腾讯</option>
                      <option value="bytedance">字节</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-center space-x-2 w-full">
                      <span className="text-xs text-gray-600">测试环境</span>
                      <div
                        className={`relative inline-block w-10 h-5 rounded-full transition-all ${currentEnvironment === 'production' ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => onEnvironmentChange(currentEnvironment === 'production' ? 'test' : 'production')}
                      >
                        <div
                          className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all ${currentEnvironment === 'production' ? 'translate-x-5' : 'translate-x-0'}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">生产环境</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              {config.userInfo && (
                <div className="border-t border-gray-100 bg-white">
                  <div
                    className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={config.userInfo.onClick}
                  >
                    <img
                      alt={config.userInfo.name}
                      src={config.userInfo.avatarUrl}
                      className="size-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-xs">
                        <strong className="block font-medium">{config.userInfo.name}</strong>
                        <span> {config.userInfo.email} </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Collapsed View - Icons Only */}
        {isCollapsed && (
          <div className="flex flex-col items-center py-6 px-1 w-full z-10">
            {/* Logo (icon only) */}
            {config.logo && (
              <div className="mb-6 text-center"
                onClick={config.logo.onClick}
              >
                <svg className={`size-6 ${currentEnvironment === 'production' ? 'text-red-500' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            )}
            
            {/* Menu Icons Only */}
            <div className="space-y-3">
              {config.items.map(item => renderIconMenuItem(item))}
            </div>
          </div>
        )}

        {/* 全局的 Collapse Toggle Button - 始终显示 */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-4 right-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all z-30 ${currentEnvironment === 'production' ? 'bg-red-100' : 'bg-gray-100'}`}
          aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    )
}