import type { SidebarItem as SidebarItemType } from '../../types/sidebar'
import SidebarItem from './SidebarItem'

interface SidebarGroupProps {
  item: SidebarItemType
  isExpanded: boolean
  onToggle: (groupId: string) => void
  isItemActive: (href?: string) => boolean
}

function SidebarGroup({ 
  item, 
  isExpanded, 
  onToggle,
  isItemActive 
}: SidebarGroupProps) {
  // 确保item有children属性
  if (!item.children || item.children.length === 0) {
    return null
  }

  return (
    <details
      className="group [&_summary::-webkit-details-marker]:hidden"
      open={isExpanded}
      onToggle={() => onToggle(item.id)}
    >
      <summary
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        <div className="flex items-center">
          {item.icon || (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="size-4 mr-2 text-gray-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1.586l-.293-.293a1 1 0 00-1.414 1.414L14.414 10H13a1 1 0 100 2h1.586l.293.293a1 1 0 001.414-1.414L16.414 12H17zm-5-5a1 1 0 011 1v3.586l.293.293a1 1 0 11-1.414 1.414L12 11.414V7a1 1 0 112 0v3.586l-.293.293a1 1 0 11-1.414-1.414L12.586 6H12a1 1 0 01-1-1zm-4 4a1 1 0 00-1 1v2.586l-.293.293a1 1 0 101.414 1.414L8 15.414V11a1 1 0 00-1-1zm0-4a1 1 0 112 0v3.586l.293.293a1 1 0 11-1.414 1.414L8 11.414V7a1 1 0 012 0v3.586l-.293.293a1 1 0 11-1.414-1.414L8.586 6H8a1 1 0 01-1-1z" clipRule="evenodd" />
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
        {item.children.map(child => (
          <li key={child.id}>
            {child.children && child.children.length > 0 ? (
              // 递归渲染嵌套的分组
              <SidebarGroup
                item={child}
                isExpanded={false} // 嵌套分组默认不展开
                onToggle={onToggle}
                isItemActive={isItemActive}
              />
            ) : (
              <SidebarItem
                item={child}
                isActive={child.isActive || false || isItemActive(child.href)}
              />
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

export default SidebarGroup